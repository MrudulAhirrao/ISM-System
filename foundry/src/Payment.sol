// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {AggregatorV3Interface} from "@chainlink/contracts/v0.8/interfaces/AggregatorV3Interface.sol";

contract Payment {

    struct User {
        string name;
        uint256 balance; // Balance in ETH
        address userAddress;
        bool isRegistered;
    }

    struct Receipt {
        address sender;
        address receiver;
        uint256 amount; // Amount in ETH
    }

    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }

    AggregatorV3Interface internal priceFeed;

    mapping(address => User) public addressToUser;
    mapping(address => Receipt[]) public addressToReceipt;
    mapping(address => mapping(address => State)) public transactionState; // Tracks state per user and transaction

    constructor(address _priceFeedAddress) {
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    // Modifier to check if the user is registered
    modifier OnlyRegisteredUser() {
        require(addressToUser[msg.sender].isRegistered, "Only Registered User can call this function");
        _;
    }

    // Register a new user
    function registerUser(string memory _name) external {
        require(!addressToUser[msg.sender].isRegistered, "User already registered");
        User storage newUser = addressToUser[msg.sender];
        newUser.name = _name;
        newUser.balance = 0; // Initially, no balance
        newUser.userAddress = msg.sender;
        newUser.isRegistered = true;
    }

    // Deposit function to receive Ether and update user balance
    function deposit() external payable OnlyRegisteredUser {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        addressToUser[msg.sender].balance += msg.value;
        addressToReceipt[msg.sender].push(Receipt({
            sender: msg.sender,
            receiver: address(this),
            amount: msg.value
        }));
    }

    // Withdraw function to send Ether to the user
    function withdraw(uint256 withdrawAmountInETH) external OnlyRegisteredUser {
        require(addressToUser[msg.sender].balance >= withdrawAmountInETH, "Insufficient balance");
        addressToUser[msg.sender].balance -= withdrawAmountInETH;
        addressToReceipt[msg.sender].push(Receipt({
            sender: address(this),
            receiver: msg.sender,
            amount: withdrawAmountInETH
        }));
        payable(msg.sender).transfer(withdrawAmountInETH);
    }

    // Place an order and update state to AWAITING_DELIVERY
    function orderPlaced(address receiverAddress) external OnlyRegisteredUser {
        transactionState[msg.sender][receiverAddress] = State.AWAITING_DELIVERY;
    }

    // Mark order as delivered and update state to COMPLETE
    function deliveredOrder(address senderAddress) external OnlyRegisteredUser {
        require(transactionState[senderAddress][msg.sender] == State.AWAITING_DELIVERY, "Order not in AWAITING_DELIVERY state");
        transactionState[senderAddress][msg.sender] = State.COMPLETE;
    }

    // Transfer function to send Ether to another user
    function transfer(uint256 transferAmountInUSD, address payable receiverAddress) external OnlyRegisteredUser {
        require(transactionState[msg.sender][receiverAddress] == State.COMPLETE, "Delivery of product not confirmed by buyer");
        uint256 transferAmountInETH = convertUSDToETH(transferAmountInUSD);
        require(addressToUser[msg.sender].balance >= transferAmountInETH, "Insufficient balance");
        
        addressToUser[msg.sender].balance -= transferAmountInETH;
        addressToUser[receiverAddress].balance += transferAmountInETH;

        addressToReceipt[msg.sender].push(Receipt({
            sender: msg.sender,
            receiver: receiverAddress,
            amount: transferAmountInETH
        }));
        addressToReceipt[receiverAddress].push(Receipt({
            sender: msg.sender,
            receiver: receiverAddress,
            amount: transferAmountInETH
        }));
        
        payable(receiverAddress).transfer(transferAmountInETH);
    }

    // Get receipts for a user
    function getReceipts(address userAddress) external view returns (Receipt[] memory) {
        return addressToReceipt[userAddress];
    }

    function getUser(address userAddress) external view returns (User memory) {
        return addressToUser[userAddress];
    }

    // Convert USD to ETH using the Chainlink price feed
    function convertUSDToETH(uint256 amountInUSD) public view returns (uint256) {
        (, int256 price, , ,) = priceFeed.latestRoundData();
        require(price > 0, "Invalid price feed response"); // Added validation for price
        uint256 priceInETH = uint256(price);
        // Ensure proper handling of decimal places
        return (amountInUSD * 10**18) / priceInETH;
    }

    // Receive function to handle direct Ether transfers to the contract
    receive() external payable {}
}

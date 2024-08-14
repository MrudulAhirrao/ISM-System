// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/payment/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Escrow is PullPayment, Ownable {
    enum State { AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }

    State public currentState;

    address payable public buyer;
    address payable public seller;

    constructor() {
        currentState = State.AWAITING_PAYMENT;
    }

    function setParties(address payable _buyer, address payable _seller) external onlyOwner {
        buyer = _buyer;
        seller = _seller;
    }

    function deposit() external payable onlyBuyer {
        require(currentState == State.AWAITING_PAYMENT, "Already paid");
        currentState = State.AWAITING_DELIVERY;
    }

    function confirmDelivery() external onlyBuyer {
        require(currentState == State.AWAITING_DELIVERY, "Cannot confirm delivery");
        currentState = State.COMPLETE;
        _asyncTransfer(seller, address(this).balance);
    }

    function cancelOrder() external onlyBuyer {
        require(currentState == State.AWAITING_DELIVERY, "Cannot cancel order");
        currentState = State.AWAITING_PAYMENT;
        _asyncTransfer(buyer, address(this).balance);
    }

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this");
        _;
    }
}

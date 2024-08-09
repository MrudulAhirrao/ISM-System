// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AutomatedSupplyChain {
    struct Product {
        uint256 id;
        string name;
        uint256 quantity;
        uint256 minQuantity;
        uint256 reorderPoint;
        uint256 maxQuantity;
        address supplier;
        uint256 price; // Price per unit
    }

    struct Order {
        uint256 id;
        uint256 productId;
        uint256 quantity;
        address buyer;
        uint256 totalPrice;
        bool fulfilled;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => Order) public orders;
    uint256 public productCount = 0;
    uint256 public orderCount = 0;

    event ProductAdded(uint256 id, string name, uint256 quantity, uint256 price);
    event OrderPlaced(uint256 id, uint256 productId, uint256 quantity, address buyer, uint256 totalPrice);
    event OrderFulfilled(uint256 id, uint256 productId, uint256 quantity);
    event ReorderTriggered(uint256 id, uint256 productId, uint256 quantity);
    event PaymentMade(uint256 orderId, uint256 amount);

    function addProduct(
        string memory _name,
        uint256 _quantity,
        uint256 _minQuantity,
        uint256 _reorderPoint,
        uint256 _maxQuantity,
        address _supplier,
        uint256 _price
    ) public {
        productCount++;
        products[productCount] =
            Product(productCount, _name, _quantity, _minQuantity, _reorderPoint, _maxQuantity, _supplier, _price);
        emit ProductAdded(productCount, _name, _quantity, _price);
    }

    function placeOrder(uint256 _productId, uint256 _quantity) public payable {
        Product storage product = products[_productId];
        require(product.id > 0, "Product does not exist");
        require(product.quantity >= _quantity, "Not enough inventory");
        require(msg.value >= product.price * _quantity, "Insufficient payment");

        orderCount++;
        uint256 totalPrice = product.price * _quantity;
        orders[orderCount] = Order(orderCount, _productId, _quantity, msg.sender, totalPrice, false);
        product.quantity -= _quantity;
        emit OrderPlaced(orderCount, _productId, _quantity, msg.sender, totalPrice);

        // Transfer payment to the supplier
        payable(product.supplier).transfer(totalPrice);
        emit PaymentMade(orderCount, totalPrice);

        // Automatic fulfillment if inventory is below reorder point
        if (product.quantity <= product.reorderPoint) {
            // Trigger reorder - ideally, you would use an oracle or external system to handle this
            emit ReorderTriggered(orderCount, _productId, product.reorderPoint);
        }
    }

    function fulfillOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(!order.fulfilled, "Order already fulfilled");
        Product storage product = products[order.productId];
        require(msg.sender == product.supplier, "Only supplier can fulfill the order");

        order.fulfilled = true;
        emit OrderFulfilled(order.id, order.productId, order.quantity);

        // Restock product inventory
        product.quantity += order.quantity;

        // Automatically place a new order if stock exceeds max quantity
        if (product.quantity > product.maxQuantity) {
            // Trigger an automated action - you would need an external system for this
            emit ReorderTriggered(order.id, order.productId, product.maxQuantity - product.quantity);
        }
    }

    // Additional function to handle refunds (optional)
    function refundOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(!order.fulfilled, "Order already fulfilled");
        require(msg.sender == order.buyer, "Only buyer can request a refund");

        uint256 amountToRefund = order.totalPrice;
        payable(order.buyer).transfer(amountToRefund);
        order.fulfilled = true;
        emit PaymentMade(_orderId, amountToRefund);
    }

    function getProduct(uint256 _productId)
        public
        view
        returns (string memory, uint256, uint256, uint256, uint256, address, uint256)
    {
        Product memory product = products[_productId];
        return (
            product.name,
            product.quantity,
            product.minQuantity,
            product.reorderPoint,
            product.maxQuantity,
            product.supplier,
            product.price
        );
    }
}

import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc Create new order
// @routes POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // res.send("Add order items.");
  const { 
    user,
    orderItems, 
    shippingAddress, 
    paymentMethod, 
    itemsPrice, 
    taxPrice, 
    shippingPrice, 
    totalPrice 
  } = req.body;

  // Attempt
  // if (orderItems && orderItems.length === 0) {
  //   res.status(400);
  //   throw new Error("No order items were submitted.")
  // } else {
  //   const order = Order.create({
  //     orderItems: orderItems.map(item => ({
  //       ...item,
  //       product: item._id,
  //       _id: undefined,
  //     })), 
  //     user: user._id,
  //     shippingAddress, 
  //     paymentMethod, 
  //     itemsPrice, 
  //     taxPrice, 
  //     shippingPrice, 
  //     totalPrice
  //   });

  //   if (order) {
  //     res.status(201).json({
  //       ...order
  //     });
  //   } else {
  //     res.status(400);
  //     throw new Error("Invalid order data.");
  //   }
  // }

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items were submitted.")
  } else {
    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id,
        _id: undefined,
      })), 
      user: user._id,
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc Get logged in user's orders
// @routes GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  // res.send("Get my orders.");
  const orders = await Order.find({ user: req.user._id });

  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404);
    throw new Error("Resource not found.");
  }
});

// @desc Get logged in user's orders by ID
// @routes GET /api/orders/:id
// @access Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
  // res.send("Get orders by ID.");
  const order = await Order.findById(req.params.id).populate("user", "name email");

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found.");
  }
});

// @desc Update order to paid
// @routes PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Update order to paid.");
});

// @desc Update order to delivered
// @routes PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update order to delivered.");
});

// @desc Get all orders
// @routes GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get all orders.");
});

export { 
  addOrderItems, 
  getMyOrders, 
  getOrderById, 
  updateOrderToPaid, 
  updateOrderToDelivered, 
  getOrders 
}
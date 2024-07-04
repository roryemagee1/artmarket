import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc Create new order
// @routes POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("Add order items.")
  // const products = await Product.find({});
  // if (products) {
  //   res.status(200).json(products);
  // } else {
  //   res.status(404);
  //   throw new Error("Resource not found.")
  // }
});

// @desc Get logged in user's orders
// @routes GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("Get my orders.")
});

// @desc Get logged in user's orders by ID
// @routes GET /api/orders/:id
// @access Private
const getOrdersById = asyncHandler(async (req, res) => {
  res.send("Get orders by ID.")
});

// @desc Update order to paid
// @routes GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("Get orders by ID.")
});

// @desc Update order to delivered
// @routes GET /api/orders/:id/delivered
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Get orders by ID.")
});

// @desc Get all orders
// @routes GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("Get orders by ID.")
});

export { addOrderItems, getMyOrders, getOrdersById, updateOrderToPaid, updateOrderToDelivered, getOrders }
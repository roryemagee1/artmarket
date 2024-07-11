import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @routes GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404);
    throw new Error("Resource not found.")
  }
});

// @desc Fetch a products
// @routes GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found.")
  }
});

// @desc   Create a product
// @routes POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  // const { 
  //   user, 
  //   name, 
  //   image, 
  //   brand, 
  //   category, 
  //   description, 
  //   price, 
  //   countInStock,
  //   numReviews,
  // } = req.body
  
  // const product = new Product({
  //   user,
  //   name,
  //   image,
  //   brand,
  //   category,
  //   description,
  //   price,
  //   countInStock
  // });

  const product = new Product({
    user: req.user._id,
    name: "Sample name",
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    description: "Sample description",
    price: 0,
    countInStock: 0,
  });

  const createdProduct = await product.save();

  if (createdProduct) {
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error("Failed to create new product.")
  }
});

export { getProducts, getProductById, createProduct }

// const productSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   brand: { type: String, required: true },
//   category: { type: String, required: true },
//   description: { type: String, required: true },
//   reviews: [reviewSchema],
//   rating: { type: Number, required: true, default: 0 },
//   numReviews: { type: Number, required: true, default: 0 },
//   price: { type: Number, required: true, default: 0 },
//   countInStock: { type: Number, required: true, default: 0 },
// }, {
//   timestamps: true,
// });
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc   Fetch all products
// @routes GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  if (products) {
    res.status(200).
      json({
        products,
        page,
        pages: Math.ceil(count / pageSize)
      });
  } else {
    res.status(404);
    throw new Error("Resource not found.")
  }
});

// @desc   Fetch a product by ID
// @routes GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found.");
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

// @desc   Update a product
// @routes PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {  
    name, 
    image, 
    brand, 
    category, 
    description, 
    price, 
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  } else {
    product.name = name;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product failed to update.");
    }
  }
});

// @desc   Delete a product
// @routes DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Product deleted!",
    });
  } else {
    res.status(404);
    throw new Error("Product failed to be deleted.");
  }
})

// @desc   Create a new review
// @routes POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => (
      review.user.toString() = req.user._id.toString()
    ));

    if (alreadyReviewed) {
      res.status(400);
      console.log("Here!");
      throw new Error("Product already reviewed by user.");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({
      message: "Review added!",
    });
  } else {
    res.status(404);
    throw new Error("Review submission failed.");
  }
})

export { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct,
  deleteProduct,
  createProductReview
}

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
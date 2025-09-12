import Product from "../models/Product.js";
// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (req, res, next) => {
  const { category } = req.query;

  let query = Product.find();

  if (category) {
    query = query.where('category').equals(category);
  }

  const products = await query;

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json({
    success: true,
    data: product,
  });
};

// Cart simulation (in-memory or session-based — no DB for cart as per SRS)
let carts = {};

// @desc    Add to cart
// @route   POST /api/v1/products/cart
// @access  Private
export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!carts[req.user.id]) {
    carts[req.user.id] = [];
  }

  carts[req.user.id].push({ productId, quantity });

  res.status(200).json({
    success: true,
    message: 'Added to cart',
    cart: carts[req.user.id],
  });
};

// @desc    View cart
// @route   GET /api/v1/products/cart
// @access  Private
export const viewCart = async (req, res, next) => {
  const cart = carts[req.user.id] || [];

  res.status(200).json({
    success: true,
    cart,
  });
};

// @desc    Remove from cart
// @route   DELETE /api/v1/products/cart/:index
// @access  Private
export const removeFromCart = async (req, res, next) => {
  if (!carts[req.user.id]) {
    return res.status(404).json({ message: 'Cart empty' });
  }

  carts[req.user.id].splice(req.params.index, 1);

  res.status(200).json({
    success: true,
    message: 'Item removed',
    cart: carts[req.user.id],
  });
};
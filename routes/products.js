const express = require('express');
const {
  getProducts,
  getProduct,
  addToCart,
  viewCart,
  removeFromCart,
} = require('../controllers/productController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProduct);

router.use(protect);

router.route('/cart').get(viewCart).post(addToCart);
router.route('/cart/:index').delete(removeFromCart);

module.exports = router; // ✅ Correct export
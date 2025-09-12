import express from "express";

import  {
  getProducts,
  getProduct,
  addToCart,
  viewCart,
  removeFromCart,
} from '../controllers/productController.js';
import  { protect } from '../middlewares/auth.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProduct);

router.use(protect);

router.route('/cart').get(viewCart).post(addToCart);
router.route('/cart/:index').delete(removeFromCart);

export default router;
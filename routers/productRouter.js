import express from 'express'
import { addProduct, deleteProduct, getProducts, getProductsById, getTopProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/:id', getProductsById);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
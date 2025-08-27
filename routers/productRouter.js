import express from 'express'
import { addProduct, deleteProduct, getProducts, getProductsById, getTopProducts, updateProduct } from '../controllers/productController.js';

import { productAddSchema } from '../models/product.js';
import validateHandler from '../middlewares/validationHandler.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/:id', getProductsById);
router.post('/', checkAuth, validateHandler(productAddSchema), addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
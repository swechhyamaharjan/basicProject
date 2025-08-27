import express from 'express'
import { addProduct, deleteProduct, getProducts, getProductsById, getTopProducts, updateProduct } from '../controllers/productController.js';

import { productAddSchema, productUpdateSchema} from '../models/product.js';
import validateHandler from '../middlewares/validationHandler.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/:id', getProductsById);
router.post('/', checkAuth, checkAdmin, validateHandler(productAddSchema), addProduct);
router.put('/:id',checkAuth, checkAdmin, validateHandler(productUpdateSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
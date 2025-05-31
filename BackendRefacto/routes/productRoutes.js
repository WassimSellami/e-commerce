import express from 'express';
import bodyParser from 'body-parser';
import { getProductsByCategory, getProductById, getCategories, updateProductQuantities, createProduct, updateProductById, deleteProductById } from '../controllers/productController.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', getProductsByCategory);
router.get('/:id', getProductById);
router.get('/categories', getCategories);
router.patch('/quantity', updateProductQuantities);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;
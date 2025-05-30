import express from 'express';
import bodyParser from 'body-parser';
import { getAllProducts } from '../controllers/productController.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', getAllProducts);

export default router;
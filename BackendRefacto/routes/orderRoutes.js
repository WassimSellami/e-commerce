import express from 'express';
import bodyParser from 'body-parser';
import { getAllOrders, createOrder } from '../controllers/orderController.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', getAllOrders);
router.post('/', createOrder);

export default router;
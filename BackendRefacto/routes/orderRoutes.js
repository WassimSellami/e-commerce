import express from 'express';
import bodyParser from 'body-parser';
import { getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', getAllOrders);

export default router;
import express from 'express';
import { getAllProducts, getProductById } from '../db/db_queries.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
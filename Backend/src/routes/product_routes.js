import express from 'express';
import bodyParser from 'body-parser';
import { getAllProducts, getProductById, updateStockQuantities } from '../db/db_queries.js';

const router = express.Router();
router.use(bodyParser.json());

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

router.post('/updateQuantity', async (req, res) => {
    const { leftQuantitits } = req.body;
    console.log(leftQuantitits);
    try {
        await updateStockQuantities(leftQuantitits);
        res.status(200).json({ Success: 'Quantity updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;
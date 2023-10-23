import express from 'express';
import bodyParser from 'body-parser';
import { getAllProducts, getProductById, updateStockQuantities, createProduct, updateProduct, deleteProduct } from '../db/db_queries.js';

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

router.patch('/updateQuantity', async (req, res) => {
    const { leftQuantitits } = req.body;
    console.log(leftQuantitits);
    try {
        await updateStockQuantities(leftQuantitits);
        res.status(200).json({ Success: 'Quantity updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.post('/create', async (req, res) => {
    const { details } = req.body;
    try {
        await createProduct(details);
        res.status(200).json({ Success: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/update', async (req, res) => {
    const { details } = req.body;
    try {
        await updateProduct(details);
        res.status(200).json({ Success: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        await deleteProduct(id);
        res.status(200).json({ Success: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;
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

router.get('/:id', async (req, res) => {
    const productId = req.params.id;
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

router.patch('/quantity', async (req, res) => {
    const { leftQuantities } = req.body;
    console.log(leftQuantities);
    try {
        await updateStockQuantities(leftQuantities);
        res.status(200).json({ Success: 'Quantity updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.post('/', async (req, res) => {
    const { details } = req.body;
    try {
        await createProduct(details);
        res.status(200).json({ Success: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { details } = req.body;
    try {
        await updateProduct(id, details);
        res.status(200).json({ Success: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProduct(id);
        res.status(200).json({ Success: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;
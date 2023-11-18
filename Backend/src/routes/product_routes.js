import express from 'express';
import bodyParser from 'body-parser';
import { getProductsByCategory, getAllProducts, getProductById, updateStockQuantities, createProduct, updateProduct, deleteProduct, getAllCategories } from '../db/db_queries.js';

const router = express.Router();

router.use(bodyParser.json());

router.get('/', async (req, res) => {
    try {
        const category = req.query.category;
        const products = (category == "All") ? await getAllProducts() : await getProductsByCategory(category);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ Error: 'Internal Server Error' });
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ Error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getProductById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(404).json({ Error: error.message });
    }
});

router.patch('/quantity', async (req, res) => {
    const { leftQuantities } = req.body;
    try {
        await updateStockQuantities(leftQuantities);
        res.status(200).json({ Success: 'Quantity updated successfully' });
    }
    catch (error) {
        if (error.message.includes('Product with ID')) {
            res.status(404).json({ Error: error.message });
        } else {
            res.status(500).json({ Error: error.message });
        }
    }
})

router.post('/', async (req, res) => {
    const { details } = req.body;
    try {
        await createProduct(details);
        res.status(200).json({ Success: 'Product created successfully' });
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { details } = req.body;
    try {
        await updateProduct(id, details);
        res.status(200).json({ Success: 'Product updated successfully' });
    }
    catch (error) {
        if (error.message.includes('Product with ID')) {
            res.status(404).json({ Error: error.message });
        } else {
            res.status(500).json({ Error: error.message });
        }
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProduct(id);
        res.status(200).json({ Success: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ Error: error.message });
    }
})

export default router;
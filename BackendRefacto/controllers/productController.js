import productService from '../services/productService.js';


export const getProductsByCategory = async (req, res) => {
    try {
        const category = req.query.category
        const products = await productService.getProductsByCategory(category);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await productService.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: `Product with ID ${id} not found` });
        }
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await productService.getCategories();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateProductQuantities = async (req, res) => {
    try {
        const { leftQuantities } = req.body;
        if (!leftQuantities) {
            return res.status(400).json({ error: 'Product quantities are required' });
        }
        await productService.updateProductQuantities(leftQuantities);
        res.status(200).json({ success: 'Products quantities updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { details } = req.body;
        if (!details) {
            return res.status(400).json({ error: 'Product details are required' });
        }
        await productService.createProduct(details);
        res.status(201).json({ success: 'Product created successfully' });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const { details } = req.body;
        if (!details) {
            return res.status(400).json({ error: 'Product details are required' });
        }
        await productService.updateProductById(id, details);
        res.status(200).json({ success: 'Product updated successfully' });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        await productService.deleteProductById(id);
        res.status(204).json({});
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

import { getAllProductss } from '../services/productService.js';


export const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductss();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

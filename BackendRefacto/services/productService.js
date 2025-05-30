import { Product } from '../models/index.js'

const productService = {
    getAllProducts: async () => {
        return await Product.findAll();
    }
};

export default productService;
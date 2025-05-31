import { updateProductById } from '../controllers/productController.js';
import { sequelize, Product } from '../models/index.js'

const productService = {
    getProductsByCategory: async (category) => {
        return (!category) ? await Product.findAll() : await Product.findAll({
            where: {
                category: category
            }
        });
    },
    getProductById: async (id) => {
        return await Product.findByPk(id);
    },
    getCategories: async () => {
        const categories = await Product.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']],
            raw: true,
        });
        console.log(categories)
        const distinctCategories = categories.map(category => category.category);
        return distinctCategories;
    },
    updateProductQuantity: async (id, quantity) => {
        const product = await productService.getProductById(id);
        await product.update({ quantityInStock: quantity });
    },
    updateProductQuantities: async (leftQuantities) => {
        const promises = leftQuantities.map(async item => {
            await productService.updateProductQuantity(item.id, item.newQuantity)
        });
        await Promise.all(promises);
    },
    createProduct: async (details) => {
        return await Product.create({ name: details.name, description: details.description, price: details.price, quantityInStock: details.quantityInStock, brand: details.brand, category: details.category });
    },
    updateProductById: async (id, details) => {
        const product = await productService.getProductById(id);
        await product.update({ name: details.name, description: details.description, price: details.price, quantityInStock: details.quantityInStock, brand: details.brand, category: details.category });
    },
    deleteProductById: async (id) => {
        const product = await productService.getProductById(id);
        await product.destroy();
    },

}

export default productService;
import { where } from 'sequelize';
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
    getProductQuantity: async (id) => {
        const quantityObject = await Product.findOne({
            where: { id },
            attributes: ['quantityInStock'],
            raw: true
        });
        return quantityObject.quantityInStock;
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
        await Product.update({ quantityInStock: quantity }, { where: { id } });
    },
    updateProductQuantities: async (leftQuantities) => {
        const promises = leftQuantities.map(async item => {
            await productService.updateProductQuantity(item.id, item.newQuantity)
        });
        await Promise.all(promises);
    },
    getLeftQuantities: async (quantities) => {
        return await Promise.all(quantities.map(async ({ id, quantity }) => {
            const quantityInStock = await productService.getProductQuantity(id);
            const newQuantity = quantityInStock - quantity;
            return { id, newQuantity }
        }));
    },
    createProduct: async (details) => {
        return await Product.create({ name: details.name, description: details.description, price: details.price, quantityInStock: details.quantityInStock, brand: details.brand, category: details.category });
    },
    updateProductById: async (id, details) => {
        await Product.update({ name: details.name, description: details.description, price: details.price, quantityInStock: details.quantityInStock, brand: details.brand, category: details.category }, { where: { id } });
    },
    deleteProductById: async (id) => {
        await Product.destroy({ where: { id } });
    },
}

export default productService;
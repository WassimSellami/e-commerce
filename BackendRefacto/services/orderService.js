import { Order } from '../models/index.js'
import productService from './productService.js';

const orderService = {
    getAllOrders: async () => {
        return await Order.findAll();
    },
    createOrder: async (details) => {
        await Order.create({ price: details.price, name: details.name, address: details.address, date: new Date() });
        const leftQuantities = await productService.getLeftQuantities(details.quantities);
        await productService.updateProductQuantities(leftQuantities);
    }
};

export default orderService;
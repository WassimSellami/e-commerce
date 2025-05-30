import { Order } from '../models/index.js'

const orderService = {
    getAllOrders: async () => {
        return await Order.findAll();
    }
};

export default orderService;
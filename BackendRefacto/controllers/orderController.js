import orderService from '../services/orderService.js';


export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

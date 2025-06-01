import orderService from '../services/orderService.js';


export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { details } = req.body;
        if (!details) {
            return res.status(400).json({ error: 'Order details are required' });
        }
        await orderService.createOrder(details);
        res.status(201).json({ success: "Order created successfully" });
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

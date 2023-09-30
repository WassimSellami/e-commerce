import express from 'express';
import bodyParser from 'body-parser';

import { createOrder, getAllOffers } from '../db/db_queries.js';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', async (req, res) => {
    try {
        const offers = await getAllOffers();
        res.json(offers);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/create', async (req, res) => {
    const { orderDetails } = req.body;
    var message
    try {
        await createOrder(orderDetails);
        message = "Order created successfully";
        res.status(200).json({ "message": message })
    } catch (error) {
        message = "Internal Server Error: Order Not Created"
        res.status(500).json({ "message": message });
    }
})

export default router;
import express from 'express';
import productRoutes from './routes/productRoutes.js';

// import cors from 'cors';
const app = express();

// app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
    res.send('Home Page');
});

// Use the productRoute module for '/api/products' route
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
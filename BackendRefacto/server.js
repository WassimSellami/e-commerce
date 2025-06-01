import express from 'express';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
// import { importProductsFromCSV } from './utils/fill_db.js';

// import cors from 'cors';
const app = express();

// app.use(cors());
const port = 3000;

app.get('/', (req, res) => {
    res.send('Home Page');
});

// Use the productRoute module for '/api/products' route
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// try {
//     await importProductsFromCSV();
// } catch (err) {
//     console.error('Error importing products from CSV:', err.message);
// }
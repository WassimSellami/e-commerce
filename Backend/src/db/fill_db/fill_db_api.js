import { createProduct } from '../db_queries.js';

const productsDetails = await fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(products => products["products"].map(product => ({
        name: product.title,
        description: product.description,
        price: product.price,
        quantityInStock: product.stock,
        brand: product.brand
    })));

for (const details of productsDetails) {
    try {
        await createProduct(details);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

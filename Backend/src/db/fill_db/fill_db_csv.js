import fs from 'fs';
import csv from 'csv-parser';
import { createProduct } from '../db_queries.js';

const productsDetails = [];

fs.createReadStream('products_data.csv')
    .pipe(csv())
    .on('data', (row) => {
        productsDetails.push({
            name: row.name,
            description: row.description,
            price: parseFloat(row.price),
            quantityInStock: parseInt(row.quantityInStock),
            brand: row.brand,
            category: "Electronics"
        });
    })
    .on('end', async () => {
        for (const details of productsDetails) {
            try {
                await createProduct(details);
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    });

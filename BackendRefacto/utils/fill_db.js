import fs from 'fs';
import { parse } from 'csv-parse';
import productService from '../services/productService.js';

export async function importProductsFromCSV() {
    const csvFilePath = './data/electronics_data.csv';
    fs.createReadStream(csvFilePath)
        .pipe(parse({ columns: true, trim: true }))
        .on('data', async (row) => {
            row.name = row.name;
            row.description = row.description;
            row.brand = row.brand;
            row.price = Number(row.price);
            row.quantityInStock = Number(row.quantityInStock);
            row.category = 'Electronics';
            await productService.createProduct(row);
        })
}

import { Product } from '../models/index.js'

export const getAllProductss = async () => {
    return await Product.findAll();
};

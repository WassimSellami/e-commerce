import { sequelize } from './db_connect.js';

async function getAllProducts() {
    try {
        const products = await sequelize.models.Product.findAll();
        return products;
    } catch (error) {
        throw error;
    }
}

async function getAllOrders() {
    try {
        const offers = await sequelize.models.Order.findAll();
        return offers;
    } catch (error) {
        throw error;
    }
}

async function getProductById(id) {
    const product = await sequelize.models.Product.findByPk(id);
    if (product) {
        return product
    }
    else {
        throw new Error(`Product with ID: ${id} was not found.`);
    }
}

async function createProducts() {
    await sequelize.models.Product.create({ name: 'Book', description: "This is a book", price: 10, quantityInStock: 1, brand: "Lenovo" });
    await sequelize.models.Product.create({ name: 'Phone', description: "This is a phone", price: 150, quantityInStock: 100, brand: "Samsung" });
    await sequelize.models.Product.create({ name: 'Helmet', description: "This is a Helmet", price: 50, quantityInStock: 100, brand: "Decathlon" });
    await sequelize.models.Product.create({ name: 'Ball', description: "This is Ali's ball", price: 60, quantityInStock: 100, brand: "Decathlon" });
}

async function updateStockQuantities(leftQuantities) {
    const promises = leftQuantities.map(async item => {
        try {
            const product = await getProductById(item.id);
            await product.update({ quantityInStock: item.newQuantity });
        } catch (error) {
            throw error;
        }
    });
    await Promise.all(promises);
}

async function createOrder(details) {
    const productsWithQuantity = await Promise.all(details.productsData.map(async ({ id, quantity }) => {
        const product = await getProductById(id);
        return { product, quantity }
    }));

    const order = await sequelize.models.Order.create({
        price: details.price,
        name: details.name,
        address: details.address,
        date: new Date(),
    });

    await Promise.all(productsWithQuantity.map(async ({ product, quantity }) => {
        await order.addProduct(product, { through: { quantity } });
    }));
}

async function createProduct(details) {
    await sequelize.models.Product.create({
        price: details.price,
        name: details.name,
        description: details.description,
        brand: details.brand,
        quantityInStock: details.quantityInStock
    });
}

async function updateProduct(id, details) {
    const product = await sequelize.models.Product.findByPk(id);
    if (product) {
        await product.update({
            price: details.price,
            name: details.name,
            description: details.description,
            brand: details.brand,
            quantityInStock: details.quantityInStock
        });
    }
    else {
        throw new Error(`Product with ID: ${id} not found.`);
    }
}

async function deleteProduct(id) {
    const product = await sequelize.models.Product.findByPk(id);
    if (product) {
        await product.destroy();
    }
    else {
        throw new Error(`Product with ID: ${id} not found.`);
    }
}

export { getAllProducts, getProductById, createOrder, createProducts, getAllOrders, updateStockQuantities, createProduct, updateProduct, deleteProduct };

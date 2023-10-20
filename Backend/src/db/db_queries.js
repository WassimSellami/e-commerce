import { sequelize } from './db_setup.js';

async function getAllProducts() {
    try {
        const products = await sequelize.models.Product.findAll();
        return products;
    } catch (error) {
        throw error;
    }
}

async function getAllOffers() {
    try {
        const offers = await sequelize.models.Order.findAll();
        return offers;
    } catch (error) {
        throw error;
    }
}

async function getProductById(productId) {
    try {
        const product = await sequelize.models.Product.findByPk(productId);
        return product;
    } catch (error) {
        throw error;
    }
}

async function createProducts() {
    await sequelize.models.Product.create({ name: 'Book', description: "This is a book", price: 10, quantityInStock : 1});
    await sequelize.models.Product.create({ name: 'Phone', description: "This is a phone", price: 150, quantityInStock: 100 });
    await sequelize.models.Product.create({ name: 'Helmet', description: "This is a Helmet", price: 50, quantityInStock: 100 });
}

async function createOrder(details) {
    const productsWithQuantity = await Promise.all(details.productsData.map(async ({ id, quantity }) => {
        const product = await getProductById(id);
        console.log({ product, quantity });
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

export { getAllProducts, getProductById, createOrder, createProducts, getAllOffers };

import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'e_commerce_db',
    port: 3307,
});

async function setupDB() {
    // Define your models
    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    });

    const Order = sequelize.define('Order', {
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    const OrderProduct = sequelize.define('OrderProduct', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    });

    Order.belongsToMany(Product, { through: OrderProduct });
    Product.belongsToMany(Order, { through: OrderProduct });
}

setupDB();

sequelize.sync({ force: false })
    .then(() => {
        console.log('Connected to and synchronized with MySQL database!');
    })
    .catch((error) => {
        console.error('Error connecting to MySQL database:', error);
    });

export { sequelize };



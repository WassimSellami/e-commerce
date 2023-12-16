import { Sequelize, DataTypes } from 'sequelize';
import config from './config/config.cjs';

const sequelize = new Sequelize(config.development);
async function setupDB() {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING, // Assuming you will store hashed passwords
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    const Product = sequelize.define('Product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        quantityInStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
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

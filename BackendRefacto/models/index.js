import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.cjs';
import productDefine from './Product.js';
import orderDefine from './Order.js';
import orderProductDefine from './OrderProduct.js';
import userDefine from './UserM.js';

const sequelize = new Sequelize(config.development);

const Product = productDefine(sequelize, DataTypes);
const Order = orderDefine(sequelize, DataTypes);
const OrderProduct = orderProductDefine(sequelize, DataTypes);
const User = userDefine(sequelize, DataTypes);

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

await sequelize.sync({ force: false });
export { sequelize, Product, User, Order };

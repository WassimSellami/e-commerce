import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.cjs';
import productDefine from './Product.js';

const sequelize = new Sequelize(config.development);

const Product = productDefine(sequelize, DataTypes);

await sequelize.sync({ force: false });
export { sequelize, Product };

export default (sequelize, DataTypes) => {
    return sequelize.define('Order', {
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
};

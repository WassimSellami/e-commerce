export default (sequelize, DataTypes) => {
    return sequelize.define('OrderProduct', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    });
};

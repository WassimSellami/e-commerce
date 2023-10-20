'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Products', 'quantityInStock', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
  });
  },
};

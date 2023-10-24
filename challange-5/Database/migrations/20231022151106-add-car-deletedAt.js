'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cars', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     **/
     await queryInterface.removeColumn('cars', 'deletedAt');
  }
};

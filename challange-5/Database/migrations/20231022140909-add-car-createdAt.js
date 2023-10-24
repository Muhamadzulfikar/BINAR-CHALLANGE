'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('cars', 'created_by', {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: '14305f14-bbb4-449b-b854-40021d3ea497',
      references: {
        model: "users",
        key: "id",
      }
    })

    await queryInterface.addColumn('cars', 'updated_by', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      }
    })

    await queryInterface.addColumn('cars', 'deleted_by', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

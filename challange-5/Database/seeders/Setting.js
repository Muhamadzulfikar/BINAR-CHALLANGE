'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('settings', [
            {
                id: uuidv4(),
                name: "jwt_secret_key",
                key: JSON.stringify({ "key": "FSW1" }),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: "encryption_salt",
                key: JSON.stringify({ "key": 10 }),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('settings', null, {});
    }
};

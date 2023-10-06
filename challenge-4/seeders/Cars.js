'use strict';
const {v4: uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cars', [
      {
        id: uuidv4(),
        name: "Mobil A",
        type: "small",
        capacity: 4,
        image: "https://example.com/image1.jpg",
        rent_per_day: 50000,
        description: "Mobil kecil dengan bahan bakar irit.",
        available_at: "2023-10-10",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil B",
        type: "medium",
        capacity: 5,
        image: "https://example.com/image2.jpg",
        rent_per_day: 70000,
        description: "Mobil sedang dengan kenyamanan tinggi.",
        available_at: "2023-10-15",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil C",
        type: "large",
        capacity: 7,
        image: "https://example.com/image3.jpg",
        rent_per_day: 100000,
        description: "Mobil besar untuk keluarga besar.",
        available_at: "2023-10-12",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil D",
        type: "small",
        capacity: 4,
        image: "https://example.com/image4.jpg",
        rent_per_day: 55000,
        description: "Mobil kecil dengan harga terjangkau.",
        available_at: "2023-10-11",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil E",
        type: "medium",
        capacity: 5,
        image: "https://example.com/image5.jpg",
        rent_per_day: 75000,
        description: "Mobil sedang dengan fitur modern.",
        available_at: "2023-10-14",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil F",
        type: "large",
        capacity: 7,
        image: "https://example.com/image6.jpg",
        rent_per_day: 110000,
        description: "Mobil besar dengan kapasitas tinggi.",
        available_at: "2023-10-13",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil G",
        type: "small",
        capacity: 4,
        image: "https://example.com/image7.jpg",
        rent_per_day: 48000,
        description: "Mobil kecil untuk perjalanan singkat.",
        available_at: "2023-10-09",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil H",
        type: "medium",
        capacity: 5,
        image: "https://example.com/image8.jpg",
        rent_per_day: 68000,
        description: "Mobil sedang dengan konsumsi bahan bakar rendah.",
        available_at: "2023-10-16",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil I",
        type: "large",
        capacity: 7,
        image: "https://example.com/image9.jpg",
        rent_per_day: 100000,
        description: "Mobil besar dengan interior mewah.",
        available_at: "2023-10-17",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      },
      {
        id: uuidv4(),
        name: "Mobil J",
        type: "small",
        capacity: 4,
        image: "https://example.com/image10.jpg",
        rent_per_day: 52000,
        description: "Mobil kecil untuk perjalanan sehari-hari.",
        available_at: "2023-10-08",
        createdAt: "2023-10-10T08:00:00Z",
        updatedAt: "2023-10-10T08:00:00Z"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};

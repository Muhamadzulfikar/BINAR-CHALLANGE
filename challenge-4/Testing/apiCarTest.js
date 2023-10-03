const axios = require('axios');
const { Car } = require('../models');
const { where } = require("sequelize");

const apiUrl = 'https://';

//User Can Get List Cars
const getAllCars = async () => {
    const response = await axios.get(`${apiUrl}/cars`);

}
const Model = require("./Model");
const cars = require("../Databases/Jsons/Cars.json");

const Car = new Model(cars);

module.exports = Car;
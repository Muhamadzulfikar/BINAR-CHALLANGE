const { Car } = require('../models');

module.exports = {
    getAllCar() {
        return Car.findAll();
    },

    storeCar(body) {
        return Car.create(body);
    },

    async updateCar(body, id) {
        const updatedCar = await Car.update(body, { where: { id: id }});
        const car = updatedCar == 1 && await Car.findOne({ where: { id: id } });
        return car;
    },

    deleteCar(id) {
        return Car.destroy({where: { id: id }});
    },
}
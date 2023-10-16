const CarRepositories = require("../Repositories/CarRepositories");

module.exports = {
    list() {
        return CarRepositories.getAllCar();
    },

    create(body) {
        return CarRepositories.storeCar(body);
    },

    update(body, id) {
        return CarRepositories.updateCar(body, id);
    },

    delete(id) {
        return CarRepositories.deleteCar(id);
    },

    show(id) {
        return CarRepositories.findCarById(id);
    }
};

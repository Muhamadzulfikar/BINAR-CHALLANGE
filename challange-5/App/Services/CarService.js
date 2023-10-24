const CarRepositories = require("../Repositories/CarRepositories");

module.exports = {
    list() {
        return CarRepositories.getAllCar();
    },

    create(body, userId) {
        return CarRepositories.storeCar({...body, created_by:userId});
    },

    update(body, userId, id) {
        return CarRepositories.updateCar({...body, updated_by:userId}, id);
    },

    delete(id, userId) {
        return CarRepositories.deleteCar(id, userId);
    },

    show(id) {
        return CarRepositories.findCarById(id);
    }
};

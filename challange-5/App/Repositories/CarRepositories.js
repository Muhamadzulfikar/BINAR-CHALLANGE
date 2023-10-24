const { Car } = require('../models');
const {User} = require('../models');

module.exports = {
    getAllCar() {
        return Car.findAll({
            include: [
                {
                    model: User,
                    as: 'created',
                    attributes: ['name', 'email']
                },
                {
                    model: User,
                    as: 'updated',
                    attributes: ['name', 'email']
                },
                {
                    model: User,
                    as: 'deleted',
                    attributes: ['name', 'email']
                }
            ],
            attributes: { exclude: ['created_by', 'updated_by', 'deleted_by'] }
        });
    },

    storeCar(body) {
        return Car.create(body);
    },

    findCarById(id) {
        return Car.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'created',
                    attributes: ['name', 'email']
                },
                {
                    model: User,
                    as: 'updated',
                    attributes: ['name', 'email']
                },
                {
                    model: User,
                    as: 'deleted',
                    attributes: ['name', 'email']
                }
            ],
            attributes: { exclude: ['created_by', 'updated_by', 'deleted_by'] }
        });
    },

    async updateCar(body, id) {
        const updatedCar = await Car.update(body, { where: { id: id } });
        const car = updatedCar == 1 && await Car.findOne({ where: { id: id } });
        return car;
    },

    async deleteCar(id, userId) {
        await Car.destroy({ where: { id: id } });
        return Car.update({ delete_by: userId }, { where: { id: id } })
    },
}

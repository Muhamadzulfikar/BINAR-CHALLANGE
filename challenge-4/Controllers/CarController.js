const Controller = require("./Controller");
const { Car } = require('../models');
const { where } = require("sequelize");

class CarController extends Controller {

    async index(req, res) {
        const getCar = await Car.findAll();
        res.status(200).json(getCar);
    }

    async store(req, res) {
        try {
            const postCar = await Car.create({
                "name": req.body.name,
                "type": req.body.type,
                "capacity": req.body.capacity,
                "image": req.body.image,
                "rent_per_day": req.body.rent_per_day,
                "description": req.body.description,
                "available_at": req.body.available_at
            });
            res.status(201).json(postCar);
        } catch (err) {
            res.status(422).json(err);
        }
    }

    async show(req, res) {
        const findCarById = await Car.findOne({
            where: { id: req.params.id }
        });
        res.status(200).json(findCarById);
    }

    async update(req, res) {
        try {
            const getCarById = await Car.findOne({
                where: {id: req.params.id}
            });

            const updateCarById = await Car.update({
                "name": getCarById.name == null ? req.body.name : getCarById.name,
                "type": getCarById.name == null ? req.body.type : getCarById.type,
                "capacity": req.body.capacity,
                "image": req.body.image,
                "rent_per_day": req.body.rent_per_day,
                "description": req.body.description,
                "available_at": req.body.available_at
            }, {
                where: { id: req.params.id },
            })

            const getUpdatedCarById = updateCarById == 1 ? await Car.findOne({
                where: { id: req.params.id }
            }) : null;

            res.status(201).json(getUpdatedCarById);
        } catch (err) {
            res.status(422).json(err);
        }
    }

    async delete(req, res) {
        try {
            const deleteCarById = await Car.destroy({
                where: { id: req.params.id }
            });
        
            deleteCarById == 1 ? res.status(200).json({"message": "Delete Successfully"}) : null; 
        } catch (err) {
            res.status(422).json(err);
        }
    }
}

const carController = new CarController;
module.exports = carController;
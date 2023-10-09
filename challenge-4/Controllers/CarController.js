const Controller = require("./Controller");
const { Car } = require('../models');
const {v4: uuidv4} = require('uuid');


class CarController extends Controller {

    async index(req, res) {
        try{
            const getCar = await Car.findAll();
            res.status(200).json(getCar);
        } catch(err){
            res.status(500).json(err);
        }
    }

    async store(req, res) {
        try {
            req.body.id = uuidv4();
            const postCar = await Car.create(req.body);
            res.status(201).json(postCar);
        } catch (err) {
            res.status(422).json(err);
        }
    }

    show(req, res) {
        res.status(200).json(req.car);
    }

    async update(req, res) {
        try {
            const bodyRequest = req.body;
            const updateCarById = await Car.update(bodyRequest,{
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
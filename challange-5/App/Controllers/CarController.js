const Controller = require("./Controller");
const {v4: uuidv4} = require('uuid');
const CarService = require('../Services/CarService');

class CarController extends Controller {

    async index(req, res) {
        try{
            const getCar = await CarService.list();
            res.status(200).json(getCar);
        } catch(err){
            res.status(500).json(err);
        }
    }

    async store(req, res) {
        try {
            req.body.id = uuidv4();
            const postCar = await CarService.create(req.body);
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
            const updateCar = await CarService.update(bodyRequest, req.params.id)
            res.status(201).json(updateCar);
        } catch (err) {
            res.status(422).json(err);
        }
    }

    async delete(req, res) {
        try {
            const deleteCarById = await CarService.delete(req.params.id);
            deleteCarById == 1 ? res.status(200).json({"message": "Delete Successfully"}) : null; 
        } catch (err) {
            res.status(422).json(err);
        }
    }
}

const carController = new CarController;
module.exports = carController;
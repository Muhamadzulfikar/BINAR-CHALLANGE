const Controller = require("./Controller");
const {v4: uuidv4} = require('uuid');
const CarService = require('../Services/CarService');

class CarController extends Controller {

    async index(req, res) {
        try{
            const getCar = await CarService.list();
            res.status(200).json({
                "status": "200 OK Successfully Get",
                "data": getCar
            });
        } catch(err){
            res.status(500).json(err);
        }
    }

    async store(req, res) {
        try {
            req.body.id = uuidv4();
            const postCar = await CarService.create(req.body);
            res.status(201).json({
                "status": "201 OK Successfully Post",
                "data": postCar
            });
        } catch (err) {
            res.status(422).json(err);
        }
    }

    show(req, res) {
        res.status(200).json({
            "status": "200 OK Successfully Get",
            "data": req.car
        });
    }

    async update(req, res) {
        try {
            const bodyRequest = req.body;
            const updateCar = await CarService.update(bodyRequest, req.params.id)
            res.status(201).json({
                "status": "201 OK Successfully Update",
                "data": updateCar
            });
        } catch (err) {
            res.status(422).json(err);
        }
    }

    async delete(req, res) {
        try {
            const deleteCarById = await CarService.delete(req.params.id);
            deleteCarById == 1 ? res.status(200).json({
                "status": "200 OK Successfully Delete",
                "message": "Delete Successfully"
            }) : null; 
        } catch (err) {
            res.status(422).json(err);
        }
    }
}

const carController = new CarController;
module.exports = carController;
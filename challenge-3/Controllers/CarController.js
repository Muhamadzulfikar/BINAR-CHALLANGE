const Car = require("../Models/Car");
const Controller = require("./Controller");

class CarController extends Controller {

    index(req, res) {
        res.status(200).json(Car.all());
    }
    store(req, res) {
        req.body.id = Car.generateId();

        req.body.uuid = Car.generateUUID();
        const car = Car.create(req.body);

        res.status(201).json(car);
    }

    show(req, res){
        res.status(200).json(Car.find(req.params.id));
    }

    update(req, res){
        const car = Car.find(req.params.id);
        const { image, rentPerDay, capacity, description, availableAt } = req.body;
        car.image = image;
        car.rentPerDay = rentPerDay;
        car.capacity = capacity;
        car.description = description;
        car.availableAt = availableAt

        res.status(200).json(car);
    }

    delete(req, res){
        const car = Car.find(req.params.id);

        if(car == null){
            return res.status(404).json({"message": "Data Not Found"});
        }

        Car.delete(car);

        res.status(204).json(deletedCar);
    }
}

const carController = new CarController;
module.exports = carController;
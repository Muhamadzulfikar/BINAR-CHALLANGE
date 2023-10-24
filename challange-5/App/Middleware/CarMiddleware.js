const CarService = require('../Services/CarService')
const ErrorHandling = require("../Error/ErrorHandling");
const responseError = require("../Error/responseError");

exports.findAndSetFeedById = async (req, res, next) => {
    try {
        const car = await CarService.show(req.params.id);
        if (car) {
            req.car = car;
            next();
        } else {
            res.status(404).json({ "message": "Car not found" });
        }
    } catch (err) {
        res.status(402).json(err)
    }
}

exports.validateCars = (req, res, next) => {
    try {
        const { name, type, capacity, image, rent_per_day, description, available_at } = req.body;
        !name && ErrorHandling.badRequest('Name must not be empty');
        !type && ErrorHandling.badRequest('Type must not be empty');
        !capacity && ErrorHandling.badRequest('Capacity must not be empty');
        !image && ErrorHandling.badRequest('Image must not be empty');
        !rent_per_day && ErrorHandling.badRequest('Rent Per Day must not be empty');
        !description && ErrorHandling.badRequest('Description must not be empty');
        !available_at && ErrorHandling.badRequest('Available At must not be empty');

        next();
    } catch (error) {
        responseError(res, error);
    }
}
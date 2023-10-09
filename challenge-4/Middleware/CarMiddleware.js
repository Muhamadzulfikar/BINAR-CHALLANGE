const { Car } = require('../models');

const findAndSetFeedById = async (req, res, next) => {
    try {
        const car = await Car.findByPk(req.params.id);
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


module.exports = findAndSetFeedById;
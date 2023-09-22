const CarMidlleware = (req, res, next) => {
    const { image, rentPerDay, capacity, description, availableAt } = req.body;
    const isImage = typeof image === 'string';
    const isRentPerDay = typeof rentPerDay === 'number';
    const isCapacity = typeof capacity === 'number';
    const isDecription = typeof description === 'string';
    const isAvailableAt = isNaN(new Date(availableAt).getTime());
    if (isImage && isRentPerDay && isCapacity && isDecription && !isAvailableAt) {
        next();
    } else{
        return res.status(400).json({"Error": "Gagal Pada Validasi, Silahkan Cek Data Yang Dikirimkan"});
    }
}

module.exports = CarMidlleware;
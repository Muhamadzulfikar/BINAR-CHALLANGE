const CarAlreadyRentedError = require("../CarAlreadyRentedError");

describe("CarAlreadyRentedError", () => {
    it("should return car data", () => {
        const car = { name: "TestCar" };
        const carAlreadyRentedError = new CarAlreadyRentedError(car);

        expect(carAlreadyRentedError.message).toBe(`${car.name} is already rented!!`);
        expect(carAlreadyRentedError.name).toBe("Error");

        // Check JSON representation
        expect(carAlreadyRentedError.toJSON()).toEqual({
            error: {
                name: "Error",
                message: `${car.name} is already rented!!`,
                details: {},
            },
        });
    });
});

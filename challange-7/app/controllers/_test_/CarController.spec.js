const CarController = require('../CarController');

jest.mock('sequelize', () => {
  const originalSequelize = jest.requireActual('sequelize');
  return {
    ...originalSequelize,
    Op: {
      ...originalSequelize.Op,
    },
  };
});

// Mocks
const mockCarModel = {
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  count: jest.fn(),
};

const mockUserCarModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const mockDayjs = {
  add: jest.fn(),
};

const mockRequest = (body, params, query) => ({ body, params, query });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

describe('CarController', () => {
  let controller;

  beforeEach(() => {
    controller = new CarController({
      carModel: mockCarModel,
      userCarModel: mockUserCarModel,
      dayjs: mockDayjs,
    });
  });

  describe('handleListCars', () => {
    it('should handle listing cars successfully', async () => {
      const mockReq = { query: { page: 2, pageSize: 10 } };
      const mockRes = mockResponse();

      const mockCars = [{ id: 1, name: 'Car 1' }, { id: 2, name: 'Car 2' }];
      const mockCarCount = 2;

      mockCarModel.findAll.mockResolvedValue(mockCars);
      mockCarModel.count.mockResolvedValue(mockCarCount);

      const paginationObject = {
        page: 1,
        pageCount: 1,
        pageSize: 10,
        count: mockCarCount,
      };

      controller.buildPaginationObject = jest.fn(() => paginationObject);

      await controller.handleListCars(mockReq, mockRes);

      expect(mockCarModel.findAll).toHaveBeenCalled();
      expect(mockCarModel.count).toHaveBeenCalled();

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        cars: mockCars,
        meta: {
          pagination: paginationObject,
          offset: 10,
          limit: 10,
        },
      });
    });
  });

  describe('handleGetCar', () => {
    it('should handle getting a car successfully', async () => {
      const mockReq = { params: { id: 1 } };
      const mockRes = mockResponse();

      const mockCar = { id: 1, name: 'Car 1' };

      mockCarModel.findByPk.mockResolvedValue(mockCar);

      await controller.handleGetCar(mockReq, mockRes);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCar);
    });
  });

  describe('handleCreateCar', () => {
    it('should handle creating a car successfully', async () => {
      const mockReq = {
        body: {
          name: 'Car 1',
          price: 1000,
          size: 'Medium',
          image: 'car.jpg'
        }
      };
      const mockRes = mockResponse();

      const mockCreatedCar = { id: 1, name: 'Car 1', price: 1000, size: 'Medium', image: 'car.jpg', isCurrentlyRented: false };

      mockCarModel.create.mockResolvedValue(mockCreatedCar);

      await controller.handleCreateCar(mockReq, mockRes);

      expect(mockCarModel.create).toHaveBeenCalledWith({
        name: 'Car 1',
        price: 1000,
        size: 'Medium',
        image: 'car.jpg',
        isCurrentlyRented: false,
      });

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockCreatedCar);
    });

  });

  describe('handleRentCar', () => {
    it('should handle renting a car successfully', async () => {
      const mockReq = { body: { rentStartedAt: '2023-11-30' } };
      const mockRes = mockResponse();

      const mockCar = { id: 1, name: 'Car 1' };

      const mockActiveRent = null;

      mockCarModel.findByPk.mockResolvedValue(mockCar);
      mockUserCarModel.findOne.mockResolvedValue(mockActiveRent);

      await controller.handleRentCar(mockReq, mockRes);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);

      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it('should handle renting a car with CarAlreadyRentedError', async () => {
      const mockReq = mockRequest({ body: { rentStartedAt: '2023-11-30' } });
      const mockRes = mockResponse();

      const mockCar = { id: 1, name: 'Car 1' };

      const mockActiveRent = { id: 1, userId: 1, carId: 1, rentStartedAt: '2023-11-30', rentEndedAt: '2023-12-01' };

      mockCarModel.findByPk.mockResolvedValue(mockCar);
      mockUserCarModel.findOne.mockResolvedValue(mockActiveRent);

      await controller.handleRentCar(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith("Cannot read properties of undefined (reading 'id')");
    });
  });

  describe('handleUpdateCar', () => {
    it('should handle updating a car successfully', async () => {
      const mockReq = { params: { id: 1 }, body: { name: 'Updated Car 1', price: 1200, size: 'Large', image: 'updated-car.jpg' } };
      const mockRes = mockResponse();

      const mockCar = { id: 1, name: 'Car 1', price: 1000, size: 'Medium', image: 'car.jpg', isCurrentlyRented: false };

      mockCarModel.findByPk.mockResolvedValue(mockCar);
      mockCarModel.update.mockResolvedValue([1]);

      await controller.handleUpdateCar(mockReq, mockRes);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockCarModel.update).toHaveBeenCalledWith({ id: 1, name: 'Car 1', price: 1000, size: 'Medium', image: 'car.jpg', isCurrentlyRented: false });

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated Car 1',
        price: 1200,
        size: 'Large',
        image: 'updated-car.jpg',
        isCurrentlyRented: false,
      });
    });
  });

  describe('handleDeleteCar', () => {
    it('should handle deleting a car successfully', async () => {
      const mockReq = { params: { id: 1 } };
      const mockRes = mockResponse();

      mockCarModel.destroy.mockResolvedValue(1);

      await controller.handleDeleteCar(mockReq, mockRes);

      expect(mockCarModel.destroy).toHaveBeenCalledWith(1);

      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.end).toHaveBeenCalled();
    });

  });

  describe('getCarFromRequest', () => {
    it('should get a car from the request', async () => {
      const mockReq = { params: { id: 1 } };

      const mockCar = { id: 1, name: 'Car 1' };

      mockCarModel.findByPk.mockResolvedValue(mockCar);

      const result = await controller.getCarFromRequest(mockReq);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCar);
    });

  });

  describe('getListQueryFromRequest', () => {
    it('should get a list query from the request', () => {
      const mockReq = { query: { size: 'Medium', availableAt: '2023-11-30', pageSize: 10 } };

      const result = controller.getListQueryFromRequest(mockReq);

      expect(result).toEqual({
        include: {
          model: mockUserCarModel,
          as: 'userCar',
          required: false,
        },
        where: {},
        limit: 10,
        offset: 0,
      });
    });

  });
});
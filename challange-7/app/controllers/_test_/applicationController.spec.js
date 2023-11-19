const ApplicationController = require('../ApplicationController');
const applicationController = new ApplicationController();

describe("ApplicationController", () => {
    describe('#handleGetRoot', () => {
        it("should return status 200 and message 'BCR API is up and running!", () => {
            const mockRequest = {};
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            };

            applicationController.handleGetRoot(mockRequest, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                status: "OK",
                message: "BCR API is up and running!",
            });
        });
    });

    describe('#handleNotFound', () => {
        it("should return status 404 with error message", () => {
            const mockRequest = {
                method: 'GET',
                url: '/error',
            };
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            }

            applicationController.handleNotFound(mockRequest, mockResponse)
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: {
                    name: 'Error',
                    message: 'Not found!',
                    details:{
                        "method": "GET",
                        "url": "/error",
                    },
                  },
            });
        })
    })

    describe("#handleError", () => {
        it("Should return status 500 with error name, message, detail", () => {
            const mockError = new Error('Test error');
            const mockReq = {};
            const mockRes = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn().mockReturnThis(),
            };
      
            applicationController.handleError(mockError, mockReq, mockRes);
      
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
              error: {
                name: 'Error',
                message: 'Test error',
                details: null,
              },
            });
        })
    })

    describe('getOffsetFromRequest', () => {
        it('should return the correct offset based on page and pageSize', () => {
          const mockReq = { query: { page: 2, pageSize: 10 } };
    
          const offset = applicationController.getOffsetFromRequest(mockReq);
    
          expect(offset).toBe(10);
        });
      });

      describe('buildPaginationObject', () => {
        it('should build a pagination object with correct values', () => {
          const mockReq = { query: { page: 2, pageSize: 10 } };
          const mockCount = 25;
    
          const paginationObject = applicationController.buildPaginationObject(mockReq, mockCount);
    
          expect(paginationObject).toEqual({
            page: 2,
            pageCount: 3,
            pageSize: 10,
            count: 25,
          });
        });
      });
});

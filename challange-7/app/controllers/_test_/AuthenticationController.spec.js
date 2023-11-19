const AuthenticationController = require('../AuthenticationController');

const mockUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
};

const mockRoleModel = {
    findOne: jest.fn(),
};

const mockBcrypt = {
    hashSync: jest.fn(),
    compareSync: jest.fn(),
};

const mockJwt = {
    sign: jest.fn(),
    verify: jest.fn(),
};

const mockRequest = (body) => ({ body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("AuthenticationController", () => {
    let controller;
    beforeEach(() => {
        controller = new AuthenticationController({
            userModel: mockUserModel,
            roleModel: mockRoleModel,
            bcrypt: mockBcrypt,
            jwt: mockJwt,
        });
    });

    describe("#authorize", () => {
        it("should authorize a user with the correct role'", () => {
            const mockReq = {
                headers: {
                    authorization: 'Bearer mockToken',
                },
            };

            const mockRes = mockResponse();

            mockJwt.verify.mockReturnValue({
                role: { name: 'CUSTOMER' },
            });

            const next = jest.fn();

            controller.authorize('CUSTOMER')(mockReq, mockRes, next);

            expect(next).toHaveBeenCalled();
        })

        it('should handle insufficient access', () => {
            const mockReq = {
                headers: {
                    authorization: 'Bearer mockToken',
                },
            };
            const mockRes = mockResponse();

            mockJwt.verify.mockReturnValue({
                role: { name: 'ADMIN' },
            });

            controller.authorize('CUSTOMER')(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: {
                    name: 'Error',
                    message: 'Access forbidden!',
                    details: {
                        "reason": "ADMIN is not allowed to perform this operation.",
                        "role": "ADMIN",
                    },
                },
            });
        });

        it('should handle authorization without a role specified', () => {
            const mockReq = {
                headers: {
                    authorization: 'Bearer mockToken',
                },
            };
            const mockRes = mockResponse();
            const next = jest.fn();

            mockJwt.verify.mockReturnValue({
                role: { name: 'CUSTOMER' },
            });

            controller.authorize()(mockReq, mockRes, next);

            expect(next).toHaveBeenCalled();
        });

        it('should handle token decoding error', () => {
            const mockReq = {
                headers: {
                    authorization: 'Bearer mockToken',
                },
            };
            const mockRes = mockResponse();

            mockJwt.verify.mockImplementation(() => {
                throw new Error('Token decoding error');
            });

            controller.authorize('CUSTOMER')(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: {
                    name: 'Error',
                    message: 'Token decoding error',
                    details: null,
                },
            });
        });
    })

    describe('handleLogin', () => {
        it('should handle login successfully', async () => {
            const mockReq = mockRequest({ email: 'test@example.com', password: 'password' });
            const mockRes = mockResponse();
            const mockNext = jest.fn();

            const mockUser = {
                encryptedPassword: 'hashedPassword',
                Role: { id: 1, name: 'CUSTOMER' },
            };

            mockUserModel.findOne.mockResolvedValue(mockUser);
            mockBcrypt.compareSync.mockReturnValue(true);
            mockJwt.sign.mockReturnValue('mockToken');

            await controller.handleLogin(mockReq, mockRes, mockNext);

            expect(mockUserModel.findOne).toHaveBeenCalledWith({
                where: { email: 'test@example.com' },
                include: [{ model: mockRoleModel, attributes: ['id', 'name'] }],
            });
            expect(mockBcrypt.compareSync).toHaveBeenCalledWith('password', 'hashedPassword');
            expect(mockJwt.sign).toHaveBeenCalledWith({
                id: '1', // Mock user ID
                name: 'test user', // Mock user name
                email: 'test@example.com',
                image: 'test', // Mock user image
                role: {
                    id: 1,
                    name: 'CUSTOMER',
                },
            }, 'Rahasia');

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                accessToken: 'mockToken',
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle login with non-existing user', async () => {
            const mockReq = mockRequest({ email: 'nonexistent@example.com', password: 'password' });
            const mockRes = mockResponse();
            const mockNext = jest.fn();

            mockUserModel.findOne.mockResolvedValue(null);

            await controller.handleLogin(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                name: 'EmailNotRegisteredError',
                message: 'Email not registered: nonexistent@example.com',
                details: null,
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle login with incorrect password', async () => {
            const mockReq = mockRequest({ email: 'test@example.com', password: 'wrongPassword' });
            const mockRes = mockResponse();
            const mockNext = jest.fn();

            const mockUser = {
                encryptedPassword: 'hashedPassword',
                Role: { id: 1, name: 'CUSTOMER' },
            };

            mockUserModel.findOne.mockResolvedValue(mockUser);
            mockBcrypt.compareSync.mockReturnValue(false);

            await controller.handleLogin(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith("Password is not correct!");
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle login error and call next', async () => {
            const mockReq = mockRequest({ email: 'test@example.com', password: 'password' });
            const mockRes = mockResponse();
            const mockNext = jest.fn();

            mockUserModel.findOne.mockRejectedValue(new Error('Database error'));

            await controller.handleLogin(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(new Error('Database error'));
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
        });
    });

    describe('handleRegister', () => {
        it('should handle registration successfully', async () => {
            const mockReq = mockRequest({ name: 'John Doe', email: 'john@example.com', password: 'password' });
            const mockRes = mockResponse();
            const mockNext = jest.fn();

            mockUserModel.findOne.mockResolvedValue(null); // User does not exist
            mockRoleModel.findOne.mockResolvedValue({ id: 1, name: 'CUSTOMER' }); // Mock role

            const mockUserCreate = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                encryptedPassword: 'hashedPassword',
                roleId: 1,
            };

            mockUserModel.create.mockResolvedValue(mockUserCreate);
            mockBcrypt.hashSync.mockReturnValue('hashedPassword');
            mockJwt.sign.mockReturnValue('mockToken');

            await controller.handleRegister(mockReq, mockRes, mockNext);

            expect(mockUserModel.findOne).toHaveBeenCalledWith({
                where: { email: 'john@example.com' },
            });
            expect(mockRoleModel.findOne).toHaveBeenCalledWith({
                where: { name: 'CUSTOMER' },
            });
            expect(mockUserModel.create).toHaveBeenCalledWith({
                name: 'John Doe',
                email: 'john@example.com',
                encryptedPassword: 'hashedPassword',
                roleId: 1,
            });
            expect(mockJwt.sign).toHaveBeenCalledWith({
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                image: undefined, // Mock user image
                role: {
                    id: 1,
                    name: 'CUSTOMER',
                },
            }, 'mockJwtSignatureKey');

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                accessToken: 'mockToken',
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle registration with an existing email', async () => {
            const mockReq = mockRequest({ name: 'John Doe', email: 'john@example.com', password: 'password' });
            const mockRes = mockResponse();
            const mockNext = jest.fn();

            mockUserModel.findOne.mockResolvedValue({}); // User already exists

            await controller.handleRegister(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(422);
            expect(mockRes.json).toHaveBeenCalledWith({
                name: 'EmailAlreadyTakenError',
                message: 'Email is already taken: john@example.com',
                details: null,
            });
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should handle registration error and call next', async () => {
            const mockReq = mockRequest({ name: 'John Doe', email: 'john@example.com', password: 'password' });
            const mockRes = mockResponse();
            const mockNext = jest.fn();

            mockUserModel.findOne.mockRejectedValue(new Error('Database error'));

            await controller.handleRegister(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(new Error('Database error'));
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
        });
    });

    describe('handleGetUser', () => {
        it('should handle getting user successfully', async () => {
            const mockReq = { user: { id: 1 } };
            const mockRes = mockResponse();

            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                image: 'profile.jpg',
                roleId: 1,
            };

            mockUserModel.findByPk.mockResolvedValue(mockUser);
            mockRoleModel.findByPk.mockResolvedValue({ id: 1, name: 'CUSTOMER' });

            await controller.handleGetUser(mockReq, mockRes);

            expect(mockUserModel.findByPk).toHaveBeenCalledWith(1);
            expect(mockRoleModel.findByPk).toHaveBeenCalledWith(1);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(mockUser);
        });

        it('should handle getting user with a non-existing user', async () => {
            const mockReq = { user: { id: 1 } };
            const mockRes = mockResponse();

            mockUserModel.findByPk.mockResolvedValue(null);

            await controller.handleGetUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                name: 'RecordNotFoundError',
                message: 'Record not found for model User',
                details: null,
            });
        });

        it('should handle getting user with a non-existing role', async () => {
            const mockReq = { user: { id: 1 } };
            const mockRes = mockResponse();

            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                image: 'profile.jpg',
                roleId: 1,
            };

            mockUserModel.findByPk.mockResolvedValue(mockUser);
            mockRoleModel.findByPk.mockResolvedValue(null);

            await controller.handleGetUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                name: 'RecordNotFoundError',
                message: 'Record not found for model Role',
                details: null,
            });
        });
    });

    describe('createTokenFromUser', () => {
        it('should create a token from user and role', () => {
            const mockUser = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                image: 'profile.jpg',
                roleId: 1,
            };

            const mockRole = {
                id: 1,
                name: 'CUSTOMER',
            };

            mockJwt.sign.mockReturnValue('mockToken');

            const result = controller.createTokenFromUser(mockUser, mockRole);

            expect(mockJwt.sign).toHaveBeenCalledWith({
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                image: 'profile.jpg',
                role: {
                    id: 1,
                    name: 'CUSTOMER',
                },
            }, 'Rahasia');

            expect(result).toBe('mockToken');
        });
    });

    describe('decodeToken', () => {
        it('should decode a valid token', () => {
            const mockToken = 'mockToken';

            const mockDecodedToken = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                role: {
                    id: 1,
                    name: 'CUSTOMER',
                },
            };

            mockJwt.verify.mockReturnValue(mockDecodedToken);

            const result = controller.decodeToken(mockToken);

            expect(mockJwt.verify).toHaveBeenCalledWith(mockToken, "Rahasia");
            expect(result).toEqual(mockDecodedToken);
        });

        it('should handle decoding error', () => {
            const mockToken = 'invalidToken';

            mockJwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            expect(() => controller.decodeToken(mockToken)).toThrow('Invalid token');
        });
    });

    describe('encryptPassword', () => {
        it('should encrypt a password', () => {
          const mockPassword = 'password';
    
          mockBcrypt.hashSync.mockReturnValue('hashedPassword');
    
          const result = controller.encryptPassword(mockPassword);
    
          expect(mockBcrypt.hashSync).toHaveBeenCalledWith(mockPassword, 10);
          expect(result).toBe('hashedPassword');
        });
      });
    
      describe('verifyPassword', () => {
        it('should verify a correct password', () => {
          const mockPassword = 'password';
          const mockEncryptedPassword = 'hashedPassword';
    
          mockBcrypt.compareSync.mockReturnValue(true);
    
          const result = controller.verifyPassword(mockPassword, mockEncryptedPassword);
    
          expect(mockBcrypt.compareSync).toHaveBeenCalledWith(mockPassword, mockEncryptedPassword);
          expect(result).toBe(true);
        });
    
        it('should verify an incorrect password', () => {
          const mockPassword = 'wrongPassword';
          const mockEncryptedPassword = 'hashedPassword';
    
          mockBcrypt.compareSync.mockReturnValue(false);
    
          const result = controller.verifyPassword(mockPassword, mockEncryptedPassword);
    
          expect(mockBcrypt.compareSync).toHaveBeenCalledWith(mockPassword, mockEncryptedPassword);
          expect(result).toBe(false);
        });
      });
})
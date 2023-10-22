const AuthService = require("../Services/AuthService");
const ErrorHandling = require("../Error/ErrorHandling");
const responseError = require("../Error/responseError");

module.exports = {
    validateBodyRequest(req, res, next) {
        try {
            const { name, email, password, phone } = req.body;
            !name && ErrorHandling.unauthorized('Name must not be empty');
            !email && ErrorHandling.unauthorized('Email must not be empty');
            !password && ErrorHandling.unauthorized('Password must not be empty');
            !phone && ErrorHandling.unauthorized('Phone number must not be empty');

            next();
        } catch (error) {
            responseError(res, error);
        }
    },
    async isUserHasNotRegister(req, res, next) {
        try {
            const user = await AuthService.findUser(req.body);
            user && ErrorHandling.unauthorized('User Has Already Exists');
            next();
        } catch (error) {
            responseError(res, error);
        }
    },

    async isUserHasRegister(req, res, next) {
        try {
            const user = await AuthService.findUser(req.body);
            !user && ErrorHandling.unauthorized('Cannot Find User');
            req.user = user;
            next();
        } catch (error) {
            responseError(res, error);
        }
    },

    async authorize(req, res, next) {
        try {
            const user = AuthService.authorize(req.headers.authorization);
            !user && ErrorHandling.unauthorized('User Not Found');
            req.user = user;
            next()
        } catch (error) {
            responseError(res, error);
        }
    },

    async isSuperAdmin(req, res, next) {
        try {
            const user = req.user;
            user.role != 'super admin' && ErrorHandling.forbidden(`${user.name} Is Not Super Admin`)
            next();
        } catch (error) {
            responseError(res, error);
        }
    },

    async isSuperAdminAndAdmin(req, res, next) {
        try {
            const user = req.user;
            user.role != 'super admin' || user.role != 'admin' && ErrorHandling.forbidden(`${user.name} Is Not Super Admin`)
            next();
        } catch (error) {
            responseError(res, error);
        }
    }
}
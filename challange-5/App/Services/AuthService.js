const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const SettingRepositories = require("../Repositories/SettingRepositories");
const AuthRepositories = require("../Repositories/AuthRepositories");
const ErrorHandling = require("../Error/ErrorHandling");

module.exports = {
    async userLogin(password, user) {
        const encryptedPassword = user.password;
        const isPassword = await bcrypt.compare(password, encryptedPassword);

        if (!isPassword) {
            ErrorHandling.unauthorized('Password not match');
        }

        const token = await this.createToken({ id: user.id });
        const userWithToken = { ...user.dataValues, token }

        return userWithToken
    },

    async userRegister(body) {
        const { password } = body;
        const encrypt = await this.encryptPassword(password);
        body.password = encrypt;
        const register = AuthRepositories.userRegister(body);

        return register
    },

    findUser(body) {
        const { email } = body;

        return AuthRepositories.findUser(email);
    },

    async encryptPassword(password) {
        const salt = await SettingRepositories.config('encryption_salt');
        const encryptedPassword = bcrypt.hash(password, salt);

        return encryptedPassword
    },

    async validateToken(token) {
        const jwtSecretKey = await SettingRepositories.config('jwt_secret_key');
        const validate = jwt.verify(token, jwtSecretKey);

        return validate;
    },

    async createToken(payload) {
        const jwtSecretKey = await SettingRepositories.config('jwt_secret_key');
        const createToken = jwt.sign(payload, jwtSecretKey, { expiresIn: 1800 });

        return createToken
    },

    async authorize(bearerToken) {
        !bearerToken && ErrorHandling.unauthorized('Token must be not empty');
        const token = bearerToken.split("Bearer ")[1];
        const { id } = token && await this.validateToken(token);
        const user = id && AuthRepositories.findUserById(id);

        return user;
    }
};

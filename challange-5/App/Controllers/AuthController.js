const Controller = require("./Controller");
const { v4: uuidv4 } = require('uuid');
const AuthService = require("../Services/AuthService");

module.exports = {
    async userLogin(req, res) {
        try {
            const { body, user } = req;
            const login = await AuthService.userLogin(body.password, user);
            res.status(200).json(login);
        } catch (error) {
            res.status(error.code).json(error.message)
        }
    },

    async userRegister(req, res) {
        try {
            req.body.id = uuidv4();
            if(req.user){
                req.body.role = 'admin';
            }
            const register = await AuthService.userRegister(req.body);
            res.status(201).json({
                status: 'Ok',
                message: 'Successfully register',
                data: register
            });
        } catch (error) {
            res.status(422).json(error);
        }
    }
}
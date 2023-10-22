const { User } = require('../models');

module.exports = {
    findUser(email) {
        return User.findOne({where: {email: email}});
    },

    findUserById(id) {
        return User.findByPk(id);
    },

    userRegister(body){
        return User.create(body);
    }
}
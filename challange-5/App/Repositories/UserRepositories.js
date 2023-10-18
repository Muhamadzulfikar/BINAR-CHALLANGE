const { User } = require('../models');

module.exports = {
    findUser(email) {
        return User.findOne({where: {email: email}});
    },
}
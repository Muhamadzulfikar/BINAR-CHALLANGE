const { Setting } = require('../models');

module.exports = {
    async config(name) {
        const config = await Setting.findOne({where: {name: name}});
        const {key} = config.key;
        return key
    }
}
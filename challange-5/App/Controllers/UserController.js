const UserService = require("../Services/UserService");
const Controller = require("./Controller");

class UserController extends Controller {
    async superAdminLogin(req, res){
        try {
            const {email, password} = req.body;
            const login = await UserService.superAdminLogin(email, password);
            res.status(200).json(login);
        } catch (error) {
            res.status(422).json(error);          
        }
    }
}

const userController = new UserController;
module.exports = userController;
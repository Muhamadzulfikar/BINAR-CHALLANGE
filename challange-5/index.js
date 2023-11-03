const express = require('express');
const AuthController = require('./App/Controllers/AuthController');
const carController = require('./App/Controllers/CarController');
const AuthMiddleware = require('./App/Middleware/AuthMiddleware');
const {findAndSetFeedById, validateCars} = require('./App/Middleware/CarMiddleware');
const UserController = require('./App/Controllers/UserController');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./Docs/swagger.json');
const cors = require('cors');

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.post("/login", AuthMiddleware.validateBodyLogin, AuthMiddleware.isUserHasRegister, AuthController.userLogin);
app.post("/register",  AuthMiddleware.validateBodyRequest, AuthMiddleware.isUserHasNotRegister, AuthController.userRegister);
app.post("/register/admin", AuthMiddleware.isUserHasNotRegister, AuthMiddleware.authorize, AuthMiddleware.isSuperAdmin, AuthController.userRegister)
app.get("/users", AuthMiddleware.authorize, UserController.user);

app.get("/cars", AuthMiddleware.authorize, carController.index);
app.get("/cars/:id", AuthMiddleware.authorize, findAndSetFeedById, carController.show);

app.post('/cars', AuthMiddleware.authorize, AuthMiddleware.isSuperAdminAndAdmin, validateCars, carController.store);
app.delete("/cars/:id", AuthMiddleware.authorize, AuthMiddleware.isSuperAdminAndAdmin, carController.delete);
app.put("/cars/:id", AuthMiddleware.authorize, AuthMiddleware.isSuperAdminAndAdmin, carController.update);

app.get('*', (req, res) => {
    res.status('200').json({"message": "successfully"})
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
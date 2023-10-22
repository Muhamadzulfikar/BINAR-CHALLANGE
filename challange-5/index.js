const express = require('express');
const AuthController = require('./App/Controllers/AuthController');
const carController = require('./App/Controllers/CarController');
const AuthMiddleware = require('./App/Middleware/AuthMiddleware');
const findAndSetFeedById = require('./App/Middleware/CarMiddleware');

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.post("/login", AuthMiddleware.isUserHasRegister, AuthController.userLogin);
app.post("/register",  AuthMiddleware.validateBodyRequest, AuthMiddleware.isUserHasNotRegister, AuthController.userRegister);

app.get("/cars", AuthMiddleware.authorize, carController.index);
app.get("/cars/:id", AuthMiddleware.authorize, findAndSetFeedById, carController.show);

app.post('/cars', AuthMiddleware.authorize, AuthMiddleware.isSuperAdminAndAdmin, carController.store);
app.delete("/cars/:id", AuthMiddleware.authorize, AuthMiddleware.isSuperAdminAndAdmin, carController.delete);
app.put("/cars/:id", AuthMiddleware.authorize, AuthMiddleware.isSuperAdminAndAdmin, carController.update);

app.get('*', (req, res) => {
    res.status('200').json({"message": "successfully"})
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
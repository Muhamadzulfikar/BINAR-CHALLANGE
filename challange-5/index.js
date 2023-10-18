const express = require('express');
const carController = require('./App/Controllers/CarController');
const userController = require('./App/Controllers/UserController');
const findAndSetFeedById = require('./App/Middleware/CarMiddleware');

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.post("/login/super-admin", userController.superAdminLogin)
app.get("/cars", carController.index);
app.post('/cars', carController.store);
app.get("/cars/:id", findAndSetFeedById, carController.show);
app.put("/cars/:id", carController.update);
app.delete("/cars/:id", carController.delete);
app.get('*', (req, res) => {
    res.status('200').json({"message": "successfully"})
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
const express = require('express');
const carController = require('./Controllers/CarController');
const CarMidlleware = require('./Middlewares/CarMiddleware');

const port = process.env.PORT || 8000;
const app = express();

// Pasang JSON Parser middleware
app.use(express.json());

app.get("/cars", carController.index);
app.post('/cars', CarMidlleware, carController.store)
app.get("/cars/:uuid", carController.show);
app.put('/cars/:uuid', carController.update);
app.delete('/cars/:uuid', carController.delete)
app.get('*', (req, res) => {
    res.status('200').json({"message": "successfully"})
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
const express = require('express');
const carController = require('./Controllers/CarController');

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.get("/cars", carController.index);
app.post('/cars', carController.store);
app.get("/cars/:id", carController.show);
app.put("/cars/:id", carController.update);
app.delete("/cars/:id", carController.delete);

app.get('*', (req, res) => {
    res.status('200').json({"message": "successfully"})
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
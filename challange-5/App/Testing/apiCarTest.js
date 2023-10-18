const axios = require('axios');
const { Car } = require('../models');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const { stringify } = require('uuid');

const apiUrl = 'http://localhost:8000';

//User Can Get List Cars
const getAllCars = async () => {
    try{
        const response = await axios.get(`${apiUrl}/cars`);
        const cars = await Car.findAll();
    
        if (JSON.stringify(response.data.data) === JSON.stringify(cars)) {
            return 'Passed get list cars test';
        } else {
            return 'Not passed get list cars test';
        }
    } catch(err){
        return err;
    }
}

const postCar = async () => {
    try{
        const dummyData = {
            id: uuidv4(),
            name: "Dummy Data",
            type: "large",
            capacity: 4,
            image: "https://example.com/image1.jpg",
            rent_per_day: 200000,
            description: "Mobil kecil dengan bahan bakar irit.",
            available_at: "2023-10-10",
        }

        const response = await axios.post(`${apiUrl}/cars`, dummyData);
        const findCarByName = await Car.findOne({
            where: {name: 'Dummy Data'}
        });

        if(response.data.data.id === findCarByName.id){
            return 'Passed post car test';
        } else {
            return 'Not passed post car test';
        }
    }catch(err){
        return err;
    }
}

const searchCarById = async () => {
    try{
        const dummyData = await Car.findOne({
            where: {name: 'Dummy Data'}
        });
        const id = dummyData.id;
    
        const response = await axios.get(`${apiUrl}/cars/${id}`);
    
        if(JSON.stringify(response.data.data) === JSON.stringify(dummyData)){
            return 'Passed search car by id test';
        } else {
            return 'Not passed search car by id test';
        }
    } catch (err){
        return err;
    }
}

const updateCarById = async () => {
    try{
        const dummyData = await Car.findOne({
            where: {name: 'Dummy Data'}
        });
        const id = dummyData.id;

        const updatedDummyData = {
            "type": "medium",
        }

        const response = await axios.put(`${apiUrl}/cars/${id}`, updatedDummyData);

        if(response.data.data.type == 'medium'){
            return 'Passed update car by id';
        } else {
            return 'Not passed update car by id';
        }
    } catch (err){
        return err;
    }
}

const deleteCarById = async () => {
    try{
        const dummyData = await Car.findOne({
            where: {name: 'Dummy Data'}
        });
        const id = dummyData.id;

        const response = await axios.delete(`${apiUrl}/cars/${id}`);

        if(response.data.message === 'Delete Successfully'){
            return 'Passed delete car by id test';
        } else {
            return 'Not passed delete car by id test';
        }
    } catch(err) {
        return err;
    }
}

const encryptPassword = (password) => {
    return new Promise((resolve, rejected) => {
        bcrypt.hash(password, 10, (err, encryptPassword) => {
            if (!!err){
                rejected(err);
                return;
            }

            resolve(encryptPassword);
        })
    })
}

const decryptPassword = (encryptPassword, password) => {
    return new Promise((resolve, rejected) => {
        bcrypt.compare(password, encryptPassword, (err, isPasswordCorrect) => {
            if (!!err){
                rejected(err);
                return;
            }

            resolve(isPasswordCorrect);
        })
    })
}

const test = async (password, encryptedPassword) => {
    const result = await bcrypt.compare(password, encryptedPassword);
    return console.log(result);
}

const length = "$2a$10$6M5UvCPScDXWAzybSX3iie1ZTe5gntSAGRGP8sakCXXysjlYQbtci";
console.log(length.length)

encryptPassword('admin123').then(result => console.log(result)).catch(err => console.log(err));
// decryptPassword("$2a$10$sX/fcdIUp7TNZV6lxKkQ8elQHh/S.0EMomtlbmlABNJnmPUFDech6", "admin123").then(result => console.log(result)).catch(err => console.log(err));
// const apiCarTest = async () => {
//     const getAllCarsTest = await getAllCars();
//     const postCarTest = await postCar();
//     const searchCarTest = await searchCarById();
//     const updateCarTest = await updateCarById();
//     const deleteCarTest = await deleteCarById();

//     console.log(getAllCarsTest);
//     console.log(postCarTest);
//     console.log(searchCarTest);
//     console.log(updateCarTest);
//     console.log(deleteCarTest);
// }

// apiCarTest();
const api = require('express').Router();

//Rout to the hostel apis
const hostelApi = require('./hostelApi');
api.use('/hostels', hostelApi.hostels);
api.use('/hostel', hostelApi.hostel);

//Rout to the floor apis
const floorApi = require('./floorApi');
api.use('/floor', floorApi);







module.exports = api;
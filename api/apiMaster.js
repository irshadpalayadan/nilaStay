const api = require('express').Router();

//Rout to the hostel apis
const hostelApi = require('./hostelApi');
api.use('/hostels', hostelApi.hostels);
api.use('/hostel', hostelApi.hostel);

//Rout to the floor apis
const floorApi = require('./floorApi');
api.use('/floor', floorApi);

//Rout to the room apis
const roomApi = require('./roomApi');
api.use('/room', roomApi);





module.exports = api;
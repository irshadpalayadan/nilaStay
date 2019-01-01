const api = require('express').Router();

//Rout to the hostel apis
const hostelAPi = require('./hostelApi');
api.use('/hostels', hostelAPi.hostels);
api.use('/hostel', hostelAPi.hostel);





module.exports = api;
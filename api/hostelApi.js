const hostelsRouter = require('express').Router();
const hostelRouter = require('express').Router();
const hostel = new (require('../service/hostel/hostel'))();

hostelsRouter.get('/', (req, res) => {

    hostel.getAllHostel()
    .then( ( ret ) => {
        res.status(200).json( ret );
    });
});

hostelRouter.get('/:hostelName', (req, res) => {

    hostel.getHostelbyNameLike(req.params.hostelName)
    .then(( ret ) => {
        res.status(200).json(ret);
    })
})
.post('/', (req, res) => {
    
    hostel.createHostel(req.body)
    .then( ret => {
        res.status(200).json(ret);
    })
})


module.exports = {  hostels : hostelsRouter, hostel : hostelRouter };
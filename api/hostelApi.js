const hostelsRouter = require('express').Router();
const hostelRouter = require('express').Router();
const hostel = new (require('../service/hostel/hostel'))();

hostelsRouter.get('/', (req, res) => {

    hostel.getAllHostel()
    .then( (hostels) => {
        res.status(200).json(hostels);
    });
});

hostelRouter.get('/:hostelName', (req, res) => {

    hostel.getHostelbyNameLike(hostelName)
    .then((hostels) => {
        return res.status(200).json(hostels);
    })
})
.post('/', (req, res) => {
    
    hostel.createHostel(req.body)
    .then( ret => {
        if( ret.status === 'success' ) {
            res.status(200).json({'status' : 'success', 'hostelId' : ret.id});
        } else if(ret.status === 'fail') {
            res.status(200).json({'status' : 'fail'});
        } else {
            res.status(400);
        }
    })
})


module.exports = {  hostels : hostelsRouter, hostel : hostelRouter };
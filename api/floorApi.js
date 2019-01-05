const floorRouter = require('express').Router();
const floor = new (require('../service/hostel/floor'))();

floorRouter.get('/:floorId', (req, res) => {

    
})
.post('/', (req, res) => {
    
    floor.createFloor(req.body)
    .then( ret => {
        res.status(200).json(ret);
    })
})
.delete('/:floorId', (req,res) => {

    // there is two type of deletion
    // soft deletion and hard deletion
    floor.deleteFloorById(req.params.floorId)
    .then( (ret) => {
        res.status(200).json(ret);
    });
})
.delete('/soft/:floorId', (req,res) => {

    // there is two type of deletion
    // soft deletion and hard deletion
    floor.softDeleteFloorById(req.params.floorId)
    .then( (ret) => {
        res.status(200).json(ret);
    });
});


module.exports = floorRouter;
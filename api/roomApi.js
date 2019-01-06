const roomRouter = require('express').Router();
const room = new (require('../service/hostel/room'))();

roomRouter.post('/', (req, res) => {
    room.createRoom(req.body)
    .then( ret => {
        res.status(200).json(ret);
    })
})
.delete('/:roomId', (req,res) => {

    // there is two type of deletion
    // soft deletion and hard deletion
    room.deleteRoomById(req.params.roomId)
    .then( (ret) => {
        res.status(200).json(ret);
    });
})
.delete('/soft/:roomId', (req,res) => {

    // there is two type of deletion
    // soft deletion and hard deletion
    room.softDeleteRoomById(req.params.roomId)
    .then( (ret) => {
        res.status(200).json(ret);
    });
})
.post('/user', (req, res) => {

    room.addUserToRoom(req.body)
    .then(ret => {
        res.status(200).json(ret);
    })
});


module.exports = roomRouter;
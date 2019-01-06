var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns').whoColumns;
const whoColumnUpdate = require('./whoColumns').whoColumnsUpdate;

var floorSchema = new schema({
    floorName           : { type : String, required : true},
    HostelId            : { type : mongoose.Schema.Types.ObjectId, required : true},
    ActiveRoomIdList    : [mongoose.Schema.Types.ObjectId],
    NonActiveRoomIdList : [mongoose.Schema.Types.ObjectId],
    active              : { type : Boolean, default : true},
    whoColumn
});


floorSchema.pre( 'save', function(next) {

    // handlig the who columns
    whoColumnUpdate(this);
    next();
})



var floorModel = mongoose.model('floor', floorSchema);

module.exports = floorModel;
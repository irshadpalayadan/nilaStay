var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns').whoColumns;
const whoColumnUpdate = require('./whoColumns').whoColumnsUpdate;

var roomSchema = new schema({
    roomName            : { type : String, required : true},
    floorId             : { type : mongoose.Schema.Types.ObjectId, required : true},
    HostelId            : { type : mongoose.Schema.Types.ObjectId, required : true},
    maxUserAllowed      : {type : Number, required : true},
    baseRent            : {type : Number, required : true},
    users               : [{    _id         : false,
                                userId      : mongoose.Schema.Types.ObjectId, 
                                startMonth  : String, 
                                startYear   : String,
                                discount    : Number,
                                advance     : Number
                          }],
    active              : { type : Boolean, default : true},
    facilities          : [{ _id:false, facility : String, available : Boolean}],
    whoColumn
});


roomSchema.pre( 'save', function(next) {

    // handlig the who columns
    whoColumnUpdate(this);
    next();
})



var roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;
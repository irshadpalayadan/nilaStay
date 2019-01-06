var mongoose = require('mongoose');
var schema = mongoose.Schema;
var whoColumn = require('./whoColumns').whoColumns;
const whoColumnUpdate = require('./whoColumns').whoColumnsUpdate;

var hostelSchema = new schema({
    hostelName : { type : String, required : true},
    hostelPlace: { type : String, required : true},
    hostelMob  : { type : String},
    hostelAddr : { type : String},
    ownerName  : { type : String},
    ownerMob   : { type : String},
    ownerPlace : { type : String},
    ownerAddr  : { type : String},
    active     : { type : Boolean, default : true},
    leaseStartYear  : { type : String},
    leaseStartMonth : { type : String},
    leaseEndYear  : { type : String},
    leaseEndMonth : { type : String},
    whoColumn
});


hostelSchema.pre( 'save', function(next) {

    // handlig the who columns
    whoColumnUpdate(this);
    next();
})



var hostelModel = mongoose.model('hostel', hostelSchema);

module.exports = hostelModel;
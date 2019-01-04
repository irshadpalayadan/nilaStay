var mongoose = require('mongoose');
var schema = mongoose.Schema;

var whoColumns = {
    createdBy       : {type : String},
    createdDate     : {type : String},
    // TODO: need to update when user login enabled
    lastUpdatedBy   : {type : String},
    lastUpdatedDate  : {type : String},
};

var whoColumnsUpdate = ( _this) => {
    if(_this.isNew) {
        _this.whoColumn.createdBy = _this.whoColumn.lastUpdatedBy.valueOf();
        _this.whoColumn.lastUpdatedBy = undefined;
        _this.whoColumn.createdDate = (new Date()).toUTCString();
    } else {
        _this.whoColumn.lastUpdatedDate = (new Date()).toUTCString();        
    }
};

module.exports = {whoColumns:whoColumns, whoColumnsUpdate:whoColumnsUpdate};
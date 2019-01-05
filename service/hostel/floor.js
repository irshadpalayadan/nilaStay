const objectId = require('mongoose').Types.ObjectId;
const floorTable = require('../../db/model/floorModel');
const hostel = new (require('./hostel'))();


class Floor {



    /**
     * 
     * @param {*} params 
     * @returns {status and id if success else return failed status}
     */
    createFloor( params ) {

        return new Promise(function(resolve, reject){
            var returnStatus = {status : 'fail'};
            if( params.hostelId == null || !objectId.isValid(params.hostelId)) {
                resolve(returnStatus);
            } else {
                hostel.isHostelActive(params.hostelId)
                .then( isActive => {
                    
                    if( isActive === false ) {
                        resolve(returnStatus);
                    } else {
                        var floor = new floorTable({
                            floorName : params.name,
                            HostelId  : params.hostelId,
                        });

                        // TODO :  need to update with session UserID  when session is implemented
                        floor.whoColumn.lastUpdatedBy = 'irshad';

                        floor.save()
                        .then(( floorObj ) => {
                            if( floorObj == null ) {
                                resolve(returnStatus);
                            } else {
                                resolve({status : 'success', id : floorObj.id});
                            }
                        });
                    }

                });
            }
        });       
    };





    /**
     * used to delete floor permenantly
     * 
     * @param {*} floorId 
     */

    deleteFloorById( floorId ) {

        return new Promise(function(resolve, reject) {
            
            var returnStatus = {status : 'fail'};
            if( floorId == null || !objectId.isValid(floorId)) {
                resolve(returnStatus);
            } else {
                floorTable.findByIdAndRemove(floorId)
                .then( ( deletedFloor ) => {
                    if( deletedFloor == null ) {
                        resolve(returnStatus);
                    } else {
                        // TODO : remove refrence in the hostel 
                        // remove all active and inactive child
                        // do not wait for the response
                        resolve({status : 'success'});
                    }
                });
            }
        });
    }



    /**
     * delete the hostel temporarly
     * set value of the active to false
     * @param {*} hostelId 
     */
    softDeleteFloorById( floorId ) {
        
        return floorTable.findByIdAndUpdate( floorId, {active : false}, {new : true})
        .then( ( deletedFloor ) => {
            if( deletedFloor == null ) {
                return {status : 'fail'};
            } else if( deletedFloor.active === false ) {
                // TODO : move refrence to non actve in the hostel 
                // remove all active room to non active
                // do not wait for the response
                return {status : 'success'};
            }
        });
    }
}

module.exports = Floor;
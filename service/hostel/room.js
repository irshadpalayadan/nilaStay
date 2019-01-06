const objectId = require('mongoose').Types.ObjectId;
const roomTable = require('../../db/model/roomModel');
const hostel = new (require('./hostel'))();
const floor = new (require('./floor'))();

class Room {


    /**
     * 
     * @param {*} params 
     */
    createRoom(params) {
        return new Promise(function(resolve, reject){
            var returnStatus = {status : 'fail'};
            if( params.hostelId == null || !objectId.isValid(params.hostelId) || params.floorId == null || !objectId.isValid(params.floorId)) {
                resolve(returnStatus);
            } else {
                floor.isFloorActive( params.floorId )
                .then(floorActive => {
                    if(floorActive) {
                        
                        // TODO :  validate all required attribute
                        
                        var room = new roomTable({
                            roomName  : params.name,
                            HostelId  : params.hostelId,
                            floorId   : params.floorId,
                            baseRent  : params.rent,
                            maxUserAllowed : params.totalUser,
                        });

                        for( let i=0; i<params.facilities.length; i++) {
                            room.facilities.push({facility : params.facilities[i].facility, available: params.facilities[i].status})
                        }


                        // TODO :  need to update with session UserID  when session is implemented
                        room.whoColumn.lastUpdatedBy = 'irshad';

                        room.save()
                        .then(( roomObj ) => {
                            if( roomObj == null ) {
                                resolve(returnStatus);
                            } else {
                                resolve({status : 'success', id : roomObj.id});
                            }
                        })
                        .catch( err => {
                            resolve(returnStatus);
                        });

                    } else {
                        resolve(returnStatus);
                    }
                });
            }
        });
    }



    /**
     * used to delete room permenantly
     * 
     * @param {*} roomId 
     */

    deleteRoomById( roomId ) {

        return new Promise(function(resolve, reject) {
            
            var returnStatus = {status : 'fail'};
            if( roomId == null || !objectId.isValid(roomId)) {
                resolve(returnStatus);
            } else {
                roomTable.findByIdAndRemove(roomId)
                .then( ( deletedRoom ) => {
                    if( deletedRoom == null ) {
                        resolve(returnStatus);
                    } else {
                        // TODO : remove refrence in the hostel room count 
                        // remove rerence in the floor child
                        // do not wait for the response
                        resolve({status : 'success'});
                    }
                });
            }
        });
    }


    /**
     * delete the room temporarly
     * set value of the active to false
     * @param {*} hostelId 
     */
    softDeleteRoomById( roomId ) {
        
        return roomTable.findByIdAndUpdate( roomId, {active : false}, {new : true})
        .then( ( deletedRoom ) => {
            if( deletedRoom == null ) {
                return {status : 'fail'};
            } else if( deletedRoom.active === false ) {
                // TODO : move refrence to non actve in the flootr 
                // update the room count in the hostel
                // do not wait for the response
                return {status : 'success'};
            }
        });
    }



    /**
     * 
     * @param {*} params 
     */
    addUserToRoom(params) {
        return new Promise(function(resolve, reject){
            var returnStatus = {status : 'fail'};
            if ( params.roomId == null || !objectId.isValid(params.roomId) || params.userId == null || !objectId.isValid(params.userId)) {
                resolve(returnStatus);
            } else {
                roomTable.findById(params.roomId)
                .then(roomObj => {

                    if(roomObj == null || roomObj.active === false || (roomObj.maxUserAllowed == roomObj.users.length)) {
                        resolve(returnStatus);
                    } else {
                        var user = {
                                        userId : params.userId,
                                        startYear : params.startYear,
                                        startMonth : params.startMonth,
                                        discount : params.discount,
                                        advance : params.advance
                                    };
                        roomObj.users.push(user);
                        roomObj.save()
                        .then(retObj => {
                            if( roomObj == null ) {
                                resolve(returnStatus);
                            } else {
                                
                                resolve({status : 'success', id : roomObj.id});
                            }
                        });
                    }
                });
            }
        });
    }

}


module.exports = Room;
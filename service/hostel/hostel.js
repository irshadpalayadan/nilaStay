const hostelTable = require('../../db/model/hostelModel');

/**
 * @returns All hotel details
 */
class Hostel {

    getAllHostel() {

        return hostelTable.find({active : true})
        .then( (hostels) => {
            var returnData = [];
            hostels.map((hostel) => {
                returnData.push({ id:hostel.id, name:hostel.hostelName, place:hostel.hostelPlace});
            })
            return {status : 'success', hostels : returnData};
        })
    };



    /**
     * 
     * @param {*} params 
     * @returns {save status, id if saved}
     */
    createHostel( params ) {

        var hostel = new hostelTable({
            hostelName : params.name,
            hostelPlace : params.place,
            hostelMob : params.mob,
            hostelAddr : params.address,
            ownerName : params.owner,
            ownerMob : params.ownerMob,
            ownerPlace : params.ownerPlace,
            ownerAddr : params.ownerAddr,
            leaseStartYear : params.startYear,
            leaseStartMonth : params.startMonth,
            leaseEndYear : params.endYear,
            leaseEndMonth : params.endMonth,
        });

        // TODO :  need to update with session UserID  when session is implemented
        hostel.whoColumn.lastUpdatedBy = 'irshad';

        return hostel.save()
        .then(( hostelObj ) => {
            if( hostelObj == null ) {
                return {status : 'fail'};
            } else {
                return {status : 'success', id : hostelObj.id};
            }
        })
    };



    /**
     * 
     * @param {*} hostelName 
     */
    getHostelbyNameLike( hostelName ) {
        return hostelTable.find({ hostelName : { $regex: new RegExp(hostelName, 'i') }, active : true})
        .then((hostels) => {
            if( hostels.length === 0 ) {
                return {status : 'fail'};
            } else {
                var returnData = [];
                hostels.map((hostel) => {
                    returnData.push({ id:hostel.id, name:hostel.hostelName, place:hostel.hostelPlace});
                });
                return {status : 'success', hostels : returnData};
            }
        })
    }



    /**
     * used to delete hostel permenantly
     * 
     * @param {*} hostelId 
     */

    deleteHostelById( hostelId ) {

        return hostelTable.findByIdAndRemove(hostelId)
        .then( ( deletedHostel ) => {
            if( deletedHostel == null ) {
                return {status : 'fail'};
            } else {
                return {status : 'success'};
            }
        });
    }



    /**
     * delete the hostel temporarly
     * set value of the active to false
     * @param {*} hostelId 
     */
    softDeleteHostelById( hostelId ) {
        
        return hostelTable.findByIdAndUpdate( hostelId, {active : false}, {new : true})
        .then( ( deletedHostel ) => {
            if( deletedHostel == null ) {
                return {status : 'fail'};
            } else if( deletedHostel.active === false ) {
                return {status : 'success'};
            }
        });
    }
}

module.exports = Hostel;
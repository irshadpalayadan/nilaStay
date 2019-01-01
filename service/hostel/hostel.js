const hostelTable = require('../../db/model/hostelModel');


class Hostel {

    getAllHostel() {
        return hostelTable.find()
        .then( (hostels) => {
            var returnData = {};
            hostels.map((hostel) => {
                returnData.id = hostel.id,
                returnData.name = hostel.hostelName,
                returnData.place = hostel.hostelPlace
            })
            return returnData;
        })
    };

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

        return hostel.save()
        .then(( hostelObj ) => {
            if( hostelObj == null ) {
                return {status : 'fail'};
            } else {
                return {status : 'success', id : hostelObj.id};
            }
        })
    }
}

module.exports = Hostel;
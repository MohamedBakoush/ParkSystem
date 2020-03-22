'use strict';
const fs = require('fs');
// gets parkingDetails from parkingDetails.json
let data = fs.readFileSync('parkingDetails.json');
let parkingDetails = JSON.parse(data);

// console.log(parkingDetails);

function listParkingDetails() {
  // returns parking details
  return parkingDetails;
}

function findParkingDetail(id){
  // check all parking details in parkingDetails (database)
  // for a matching id
  for (const parkingDetail of parkingDetails) {
    if (parkingDetail.id === id) {
      return parkingDetail;
    }
  }
  return null;
}

module.exports = {
  // export modules
  listParkingDetails,
  findParkingDetail,
};

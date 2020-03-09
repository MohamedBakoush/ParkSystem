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

function addParkingDetails(id,name,address,phoneNumber) {
  // checks if data exists in  parkingDetails
  // if findParkingDetail returns null (data dosent exist)
  // then add data
  if (findParkingDetail(id) === null) {
    // TODO: Fill out required data for parkingDetails
    const newParkingDetail = {
      id: id,
      name,
      address,
      phoneNumber,
    };
    // adds newParkingDetail to parkingDetails (database)
    parkingDetails = [newParkingDetail, ...parkingDetails.slice(0)];
    return newParkingDetail;
  }
}

module.exports = {
  // export modules
  listParkingDetails,
  findParkingDetail,
  addParkingDetails,
};

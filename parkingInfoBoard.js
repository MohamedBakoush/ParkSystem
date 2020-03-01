'use strict';

let parkingDetails = [
  // example of what the databse could look like
  { id: 'id_example',
    name: 'Parking_Info_Name',
    address: 'Parking_Info_Address',
    phoneNumber: 'Parking_Info_Phone_Number',
    cost15Min: 'Parking_Cost_15_Min',
    cost30Min: 'Parking_Cost_30_Min',
    cost1Hour: 'Parking_Cost_1_Hour',
    costAdditionalHour: 'Parking_Cost_Additional_Hour',
  },

  { id: 'ChIJ0XjfNHRddEgRQtXe1fjPW8w',
    // name: "NCP Car Park Portsmouth Cascades",
    // address: 'Cascades, Charlotte St, Portsmouth PO1 4RS, UK',
    // phoneNumber: '0345 050 7080',
    cost15Min: 1.50,
    cost30Min:  2.00,
    cost1Hour: 3.00,
    costAdditionalHour: 1.00,
  }
];

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

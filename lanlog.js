'use strict';

let LatLonDetails = [
  // example of what the databse could look like
  { id: 'id_example',
    Latitude: 'Location_Latitude',
    Longitude: 'Location_Longitude',
  },
];

function listLatLonDetails() {
  // returns parking details
  return LatLonDetails;
}


// addes new Lat Lon request into database
// replaces the old LatLon
function addLatLonDetails(Latitude,Longitude) {
    const newLatLonDetail = {
      Latitude: Latitude,
      Longitude: Longitude,
    };
    LatLonDetails = [newLatLonDetail];
    return newLatLonDetail;

}

module.exports = {
  // export modules
  listLatLonDetails,
  addLatLonDetails,
};

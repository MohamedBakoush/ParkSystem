function showParkingDetail_Info(parkingDetail) {
  //container for ParkingInfo Details
  //gets data from google places api
  getParkingInfomation();
  //container for ParkingInfo Details
  // gets data from local database
  const ParkingCostContainer = document.getElementById('ParkingCost_ul');
  costData(ParkingCostContainer, '15 Minutes:','£', parkingDetail.cost15Min, "cost15Min");
  costData(ParkingCostContainer, '30 Minutes:','£',parkingDetail.cost30Min, "cost30Min");
  costData(ParkingCostContainer, '1 Hour:', '£', parkingDetail.cost1Hour, "cost1Hour");
  costData(ParkingCostContainer, 'Additional Hour:', '£', parkingDetail.costAdditionalHour, "costAdditionalHour");

}
// get parking info from google places API
function getParkingInfomation(){
  const service = new google.maps.places.PlacesService(map);
  const request = {
    placeId: getParkingDetail_Id(),
    // type of values to get from
    fields: ['name', 'formatted_address', 'place_id','formatted_phone_number','opening_hours','opening_hours.weekday_text']
    };
  service.getDetails(request, function(place) {
    // giving a var an id to be asigned
    const ParkingInfoContainer = document.getElementById('ParkingInfo_ul');
    const ParkingTimeContainer = document.getElementById('ParkingOpeningHours_ul');
    const ParkingTimesState = document.getElementById('ParkingTimesState');
    //gets data and puts then into ParkingInfoContainer
    data(ParkingInfoContainer, place.place_id, "ParkingInfo_place_id");
    data(ParkingInfoContainer, place.name, "ParkingInfo_name");
    data(ParkingInfoContainer, place.formatted_address, "ParkingInfo_address");
    data(ParkingInfoContainer, place.formatted_phone_number, "ParkingInfo_phoneNumber");
    // if error is given
    // then the program will show that there is no opening info available
    try {
      // gets opening hours for each day and displays it on ParkingTimeContainer
      for (const ParkingTime of place.opening_hours.weekday_text) {
        data(ParkingTimeContainer, ParkingTime , "ParkingTime_openingHours");
      }

    } catch (e) {
      // Opening Info Not Available
      data(ParkingTimeContainer, "Opening Hours Not Available", "ParkingTime_openingHours_");
    }


 })
}

// checks if cost data is not undefined
// if available show data
// else show Not Available:
function data(container, value, string){
  const dataType = document.createElement('li');
  if(value != undefined){
    dataType.id = string;
    dataType.classList = string;
    dataType.textContent = `${value}`;
    container.appendChild(dataType);
  } else {
    dataType.id = string;
    dataType.classList = string;
    dataType.textContent = `Not Available: ${string}`;
    container.appendChild(dataType);
    };
}

// checks if cost data is not undefined
// if available show cost data
// else show Not Available:
function costData(container, stringContent, moneySign, value, class_id){
  const dataType = document.createElement('li');
  if(value != undefined){
    dataType.id = class_id;
    dataType.classList = class_id;
    dataType.textContent =  `${stringContent}  ${moneySign} ${value.toFixed(2)} `;
    container.appendChild(dataType);
  } else {
    dataType.id = class_id;
    dataType.classList = class_id;
    dataType.textContent = `Not Available: ${class_id}`;
    container.appendChild(dataType);
    };
}

// gets id from herf
function getParkingDetail_Id() {
 return window.location.hash.substring(1);
}

// useing id fetch details from parkingDetail (database)
async function loadParkingDetail() {
  const id = getParkingDetail_Id();
  const response = await fetch(`parkingDetails/${id}`);
  let parkingDetail;
  if (response.ok) {
    parkingDetail = await response.json();
  } else {
    parkingDetail = { msg: 'failed to load messages' };
  }
  // show parking details
  showParkingDetail_Info(parkingDetail);
}

function pageLoaded() {
  loadParkingDetail();
}

window.addEventListener('load', pageLoaded);

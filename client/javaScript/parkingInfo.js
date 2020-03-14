'use strict';
function getParkingDetail_Id() {// gets id from herf
 return window.location.hash.substring(1);
}

async function loadParkingDetail() {// useing id fetch details from parkingDetail (database)
  const id = getParkingDetail_Id();
  const response = await fetch(`parkingDetails/${id}`);
  let parkingDetail;
  if (response.ok) {
    parkingDetail = await response.json();
  } else {
    parkingDetail = { msg: 'failed to load messages' };
  }
  createMap(parkingDetail); // show parking details in createMap
}

async function createMap(parkingDetail){
  const google = window.google;
  const service = new google.maps.places.PlacesService(map);
  const request = {
    placeId: getParkingDetail_Id(),
    // type of values to get from
    fields: ['name', 'formatted_address', 'place_id','formatted_phone_number','opening_hours','opening_hours.weekday_text']
    };
  service.getDetails(request, function(place) {
    loadCostDetails(place);
    showParkingDetails(place, parkingDetail);
  });
}

function showParkingDetails(place, parkingDetail){
    const ParkingInfoContainer = document.getElementById('ParkingInfo_ul');
    const ParkingTimeContainer = document.getElementById('ParkingOpeningHours_ul');
    data(ParkingInfoContainer, place.name, "ParkingInfo_name");
    data(ParkingInfoContainer, place.formatted_address, "ParkingInfo_address");
    data(ParkingInfoContainer, place.formatted_phone_number, "ParkingInfo_phoneNumber");
    try { // gets opening hours for each day and displays it on ParkingTimeContainer
      for (const ParkingTime of place.opening_hours.weekday_text) {
        data(ParkingTimeContainer, ParkingTime , "ParkingTime_openingHours");
      }
    } catch (e) { // if error is given,then the program will show that there is no opening info available
      data(ParkingTimeContainer, "Opening Hours Not Available", "ParkingTime_openingHours");
    }

    const ParkingCostContainer = document.getElementById('ParkingCost_ul');
    costData(ParkingCostContainer, '15 Minutes:','£', parkingDetail.cost15Min, "cost15Min");
    costData(ParkingCostContainer, '30 Minutes:','£',parkingDetail.cost30Min, "cost30Min");
    costData(ParkingCostContainer, '1 Hour:', '£', parkingDetail.cost1Hour, "cost1Hour");
    costData(ParkingCostContainer, 'Additional Hour:', '£', parkingDetail.costAdditionalHour, "costAdditionalHour");
}

function data(container, value, string){ // checks if cost data is not undefined, if available show data, else show Not Available:
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
  }
}

function costData(container, stringContent, moneySign, value, class_id){ // checks if cost data is not undefined, if available show cost data, else show Not Available:
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
  }
}

function loadCostDetails(place){
    const date = getDate();
    try {
      // splits up the array opening_hours
      const opening_hours = place.opening_hours.weekday_text;
      const time24 = openCloseTimes24Hours(opening_hours, date);

      if(Number(time24.getTime) == 24){ // Opening Hours: Open 24 Hours
        createTicket("00:00", "23:59", false);

      } else {  // Opening Hours: Open specific Hours
        const time = openCloseTimes(opening_hours, date);
        const openClose = getOpenCloseTimes(time);
        console.log("Open specific Hours"); 
        createTicket(openClose.getOpenTime, openClose.getCloseTime, false);
      }
    } catch (e) { // this is here if Open hour dont exist
      console.log("Open hour dont exist");
      createTicket("00:00", "00:00", true);
    }
}

function getDate() {
  const date = new Date();
  const currentDate = date.toISOString().slice(0,10);
  const todaysDate = date.getDay() - 1;

  return {currentDate, todaysDate};
}

function createTicket(openTime, closeTime , disabled) {
  const date = getDate();

  const parkingID = document.getElementById("parkingID");
  createLabel(parkingID, "Parking-ID");
  ticketDataDate(parkingID, "id", getParkingDetail_Id() , disabled);

  const checkIn = document.getElementById("checkIn");
  createLabel(checkIn, "Arrivel Date");
  ticketDataDate(checkIn, "date", date.currentDate, disabled);

  const timeIn = document.getElementById("timeIn");
  createLabel(timeIn, "Time-In");
  ticketDataTime(timeIn, "time", openTime, closeTime, openTime, disabled);

  const timeOut = document.getElementById("timeOut");
  createLabel(timeOut, "Time-Out");
  ticketDataTime(timeOut, "time", openTime, closeTime, closeTime, disabled);

  const prevTicket_btn = document.getElementById("prevTicket_btn");
  createprevTicket(prevTicket_btn, "submit", "Preview Ticket", disabled);

}

function createLabel(container, string){ // label maker
  const label = document.createElement('label');
  label.textContent = string;
  container.appendChild(label);
}

function ticketDataDate(container, type, value, disabled){ // Creats input section for ticket Date
  const input = document.createElement('input');
  input.type = type;
  input.name = type;
  input.value = value;
  input.required = "true";
  input.disabled = disabled;
  container.appendChild(input);
}

function ticketDataTime(container, type, open, close, displayTime, disabled){ // Creats input section for ticket time
  const input = document.createElement('input');
  input.type = type;
  input.name = type;
  input.min = open;
  input.max = close;
  input.value = displayTime;
  input.required = "true";
  input.disabled = disabled;
  container.appendChild(input);
}

function createprevTicket(container, type, value, disabled){ // Creats button for prev Ticket
  const button = document.createElement('input');
  button.type = type;
  button.value = value;
  button.disabled = disabled;
  container.appendChild(button);
}

function openCloseTimes24Hours(opening_hours, date) {
  const openSplit = opening_hours[date.todaysDate].split(" ");
  const getOpenTimeHour = openSplit[0];
  const getOpenClose = openSplit[1];
  const getTime = openSplit[2];
  const getHours = openSplit[3];
  return {getOpenTimeHour, getOpenClose, getTime, getHours};
}

function openCloseTimes(opening_hours, date) {
  const openSplit = opening_hours[date.todaysDate].split(" ");
  const openTime = openSplit[1].split(":");
  const openTimeHour = openTime[0];
  const openTimeMin = openTime[1];
  const openTime_AM_PM = openSplit[2];
  const closeTime = openSplit[4].split(":");
  const closeTimeHour = closeTime[0];
  const closeTimeMin = closeTime[1];
  const closeTime_AM_PM = openSplit[5];
  return {openSplit, openTime, openTimeHour, openTimeMin, openTime_AM_PM,closeTime, closeTimeHour, closeTimeMin, closeTime_AM_PM };
}

function getOpenCloseTimes(time) {
  let getOpenTime, getCloseTime;
  if(time.openTime_AM_PM == "AM" || time.openTime_AM_PM == "am" ){ // when open
    console.log("Open_AM");
    getOpenTime = `${checkTime(Number(time.openTimeHour))}:${time.openTimeMin}`;
  } else {
    console.log("Open_PM");
    getOpenTime = `${Number(time.openTimeHour) + 12}:${time.openTimeMin}`;
  }
  if(time.closeTime_AM_PM == "PM" || time.closeTime_AM_PM == "pm" ){ // when the parking spaces close
    console.log("Closed_PM");
    getCloseTime = `${ Number(time.closeTimeHour) + 12}:${time.closeTimeMin}`;
  } else {
    console.log("Closed_AM");
    getCloseTime = `${checkTime(Number(time.closeTimeHour))}:${time.closeTimeMin}`;
  }
  return {getOpenTime, getCloseTime};
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function pageLoaded() {
  loadParkingDetail();
}

window.addEventListener('load', pageLoaded);

module.exports = {
  // export modules
 getParkingDetail_Id,
 loadParkingDetail,
 createMap,
 showParkingDetails,
 data,
 costData,
 loadCostDetails,
 getDate,
 createTicket,
 createLabel,
 ticketDataDate,
 ticketDataTime,
 createprevTicket,
 openCloseTimes24Hours,
 openCloseTimes,
 getOpenCloseTimes,
 checkTime
};

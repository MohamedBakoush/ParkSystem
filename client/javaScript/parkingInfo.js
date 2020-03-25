'use strict';
function getParkingDetail_Id() {// gets id from herf
  const url = window.location.href.split("parkingInfo#", 2);
  const parkingID = url[1];
  return parkingID;
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
  return parkingDetail;
}

async function createMap(parkingDetail){
  const google = window.google;
  const service = new google.maps.places.PlacesService(map); // eslint-disable-line
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
    const parkingInfoContainer = document.getElementById('parkingInfoContainer');
    ParkingInfo(place, parkingInfoContainer);
    parkingCost(place, parkingDetail, parkingInfoContainer);
    ParkingOpeningHour(place, parkingInfoContainer);
    return "showParkingDetails worked";
}

function ParkingInfo(place, container) {
  const ParkingInfo = createSection(container, "div", "parkingInfo", "parkingInfo")
  createSection(ParkingInfo, "h1", "subHeader", "subHeader", "Parking Info")
  const ParkingInfoContainer = createSection(ParkingInfo, "ul", "ParkingInfo_ul", "ParkingInfo_ul")
  data(ParkingInfoContainer, place.name, "ParkingInfo_name");
  data(ParkingInfoContainer, place.formatted_address, "ParkingInfo_address");
  data(ParkingInfoContainer, place.formatted_phone_number, "ParkingInfo_phoneNumber");
  return "ParkingInfo";
}
function parkingCost(place, parkingDetail, container) {
  const parkingCost = createSection(container, "div", "parkingCost", "parkingCost")
  createSection(parkingCost, "h1", "subHeader", "subHeader", "Rates")
  const ParkingCostContainer = createSection(parkingCost, "ul", "ParkingCost_ul", "ParkingCost_ul")
  costData(ParkingCostContainer, '15 Minutes:','£', parkingDetail.cost15Min, "cost15Min");
  costData(ParkingCostContainer, '30 Minutes:','£',parkingDetail.cost30Min, "cost30Min");
  costData(ParkingCostContainer, '1 Hour:', '£', parkingDetail.cost1Hour, "cost1Hour");
  costData(ParkingCostContainer, 'Additional Hour:', '£', parkingDetail.costAdditionalHour, "costAdditionalHour");
  return "parkingCost";
}

function ParkingOpeningHour(place, container) {
  const ParkingOpeningHour = createSection(container, "div", "ParkingOpeningHour", "ParkingOpeningHour")
  createSection(ParkingOpeningHour, "h1", "subHeader", "subHeader", "Opening Hours")
  const ParkingTimeContainer = createSection(ParkingOpeningHour, "ul", "ParkingOpeningHours_ul", "ParkingOpeningHours_ul")
  try { // gets opening hours for each day and displays it on ParkingTimeContainer
    for (const ParkingTime of place.opening_hours.weekday_text) {
      data(ParkingTimeContainer, ParkingTime , "ParkingTime_openingHours");
    }
    return "ParkingOpeningHour OK";
  } catch (e) { // if error is given,then the program will show that there is no opening info available
    data(ParkingTimeContainer, "Opening Hours Not Available", "ParkingTime_openingHours");
    return "ParkingOpeningHour Failed";
  }
}

function data(container, value, string){ // checks if cost data is not undefined, if available show data, else show Not Available:
  const dataType = document.createElement('li');
  try {
    if(value != undefined){
        dataType.id = string;
        dataType.classList = string;
        dataType.textContent = `${value}`;
        container.appendChild(dataType);
        return dataType;
    } else {
        dataType.id = string;
        dataType.classList = string;
        dataType.textContent = `Not Available: ${string}`;
        container.appendChild(dataType);
        return dataType;
    }
  } catch (e) {
    return "data failed"
  }
}

function costData(container, stringContent, moneySign, value, class_id){ // checks if cost data is not undefined, if available show cost data, else show Not Available:
  const dataType = document.createElement('li');
  try {
    if(value != undefined){
        dataType.id = class_id;
        dataType.classList = class_id;
        dataType.textContent =  `${stringContent}  ${moneySign} ${value.toFixed(2)} `;
        container.appendChild(dataType);
        return dataType;
    } else {
        dataType.id = class_id;
        dataType.classList = class_id;
        dataType.textContent = `Not Available: ${class_id}`;
        container.appendChild(dataType);
        return dataType;
    }
  } catch (e) {
    return "costData failed";
  }
}

function loadCostDetails(place){
    const date = getDate();
    try { // splits up the array opening_hours
      const opening_hours = place.opening_hours.weekday_text;
      const time24 = openCloseTimes24Hours(opening_hours, date);
      if(Number(time24.getTime) == 24){ // Opening Hours: Open 24 Hours
        createTicket("00:00", "23:59", false);
      } else {  // Opening Hours: Open specific Hours
        const time = openCloseTimes(opening_hours, date);
        const openClose = getOpenCloseTimes(time);
        createTicket(openClose.getOpenTime, openClose.getCloseTime, false);
      }
    } catch (e) { // this is here if Open hour dont exist
      createTicket("00:00", "00:00", true);
    }
    return "loadCostDetails works";
}

function getDate() {
  const date = new Date();
  const currentDate = date.toISOString().slice(0,10);
  let todaysDate;
  if (date.getDay() == 0) {
    todaysDate = 6;
  } else {
    todaysDate = date.getDay() - 1;
  }

  return {currentDate, todaysDate};
}

function createTicket(openTime, closeTime , disabled) {
  const date = getDate();
  const ticketContainer = document.getElementById("ticketContainer");

  const ticketForm = createForm(ticketContainer, "ticketForm", "ticketForm", "ticket");

  createSection(ticketForm, "h1", "subHeader", "subHeader", "Buy a ticket");

  const parkingID = createSection(ticketForm, "div", "parkingID", "parkingID");
  createLabel(parkingID, "Parking-ID");
  ticketDataDate(parkingID, "id", getParkingDetail_Id() , disabled);

  const checkIn = createSection(ticketForm, "div", "checkIn", "checkIn");
  createLabel(checkIn, "Arrivel Date");
  ticketDataDate(checkIn, "date", date.currentDate, disabled);

  const timeIn = createSection(ticketForm, "div", "time", "timeIn");
  createLabel(timeIn, "Time-In");
  ticketDataTime(timeIn, "time", openTime, closeTime, openTime, disabled);

  const timeOut = createSection(ticketForm,"div", "time", "timeOut");
  createLabel(timeOut, "Time-Out");
  ticketDataTime(timeOut, "time", openTime, closeTime, closeTime, disabled);

  const prevTicket_btn = createSection(ticketForm,"div", "prevTicket_btn", "prevTicket_btn");
  createprevTicket(prevTicket_btn, "submit", "Preview Ticket", disabled);

  return "createTicket all good";
}

function createForm(container, classHere, idHere, action){
  try {
    const form = document.createElement("form");
    form.classList = classHere;
    form.id = idHere;
    form.action = action;
    container.appendChild(form);
    return form;
  } catch (e) {
    return "createForm didnt work";
  }
}

function createSection(container,dataType, classHere, idHere, textContent){
  try {
    const section = document.createElement(dataType);
    section.classList = classHere;
    section.id = idHere;
    section.textContent = textContent;
    container.appendChild(section);
    return section;
  } catch (e) {
    return "createSection didnt work";
  }
}

function createLabel(container, string){ // label maker
  try {
    const label = document.createElement('label');
    label.textContent = string;
    container.appendChild(label);
    return label;
  } catch (e) {
    return "createLabel didnt work";
  }
}

function ticketDataDate(container, type, value, disabled){ // Creats input section for ticket Date
  try {
    const ticketData = document.createElement('input');
    ticketData.type = type;
    ticketData.name = type;
    ticketData.value = value;
    ticketData.required = "true";
    ticketData.disabled = disabled;
    container.appendChild(ticketData);
    return ticketData;
  } catch (e) {
      return "ticketDataDate didnt work";
  }
}

function ticketDataTime(container, type, open, close, displayTime, disabled){ // Creats input section for ticket time
  try {
    const dataTime = document.createElement('input');
    dataTime.type = type;
    dataTime.name = type;
    dataTime.min = open;
    dataTime.max = close;
    dataTime.value = displayTime;
    dataTime.required = "true";
    dataTime.disabled = disabled;
    container.appendChild(dataTime);
    return dataTime;
  } catch (e) {
    return  "ticketDataTime didnt work";
  }
}

function createprevTicket(container, type, value, disabled){ // Creats button for prev Ticket
  try {
    const button = document.createElement('input');
    button.type = type;
    button.value = value;
    button.disabled = disabled;
    container.appendChild(button);
    return button;
  } catch (e) {
    return "createprevTicket didnt work";
  }
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
    getOpenTime = `${checkTime(Number(time.openTimeHour))}:${time.openTimeMin}`;
  } else {
    getOpenTime = `${Number(time.openTimeHour) + 12}:${time.openTimeMin}`;
  }
  if(time.closeTime_AM_PM == "PM" || time.closeTime_AM_PM == "pm" ){ // when the parking spaces close
    getCloseTime = `${ Number(time.closeTimeHour) + 12}:${time.closeTimeMin}`;
  } else {
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
 ParkingInfo,
 parkingCost,
 ParkingOpeningHour,
 data,
 costData,
 loadCostDetails,
 getDate,
 createTicket,
 createForm,
 createSection,
 createLabel,
 ticketDataDate,
 ticketDataTime,
 createprevTicket,
 openCloseTimes24Hours,
 openCloseTimes,
 getOpenCloseTimes,
 checkTime
};

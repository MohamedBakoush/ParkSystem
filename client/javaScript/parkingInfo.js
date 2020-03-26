'use strict';

function getParkingDetail_Id() {  // splitting up the url to get id
  const url = window.location.href.split("parkingInfo#", 2);
  const parkingID = url[1]; // assign id to parkingID
  return parkingID; // return id
}

async function loadParkingDetail() { // useing id to fetch parking details from parkingDetail (database)
  const id = getParkingDetail_Id(); // assign id from getParkingDetail_Id
  const response = await fetch(`parkingDetails/${id}`);  // fetch parkingDetails with provided id
  let parkingDetail;
  if (response.ok) { // if response is ok assign parkingDetail with data from database
    parkingDetail = await response.json();
  } else { // if respons fails assign parkingDetail with error message
    parkingDetail = { msg: 'failed to load messages' };
  }
  createMap(parkingDetail); // give fetchParkingInfo parkingDetail
  return parkingDetail; // retrun parkingDetail
}

async function createMap(parkingDetail){
  const google = window.google;
  const service = new google.maps.places.PlacesService(map); // eslint-disable-line
  const request = { // to request only request provided from placeId provided
    placeId: getParkingDetail_Id(), // assign getParkingDetail_Id to placeId
    fields: ['name', 'formatted_address', 'place_id','formatted_phone_number','opening_hours','opening_hours.weekday_text']  // request only these fields from google places api
    };
  service.getDetails(request, function(place) {
    loadCostDetails(place); // give place to loadCostDetails
    showParkingDetails(place, parkingDetail); // give place to showParkingDetails
  });
}

function showParkingDetails(place, parkingDetail){
    const parkingInfoContainer = document.getElementById('parkingInfoContainer'); // get element by id and assign it to parkingInfoContainer
    ParkingInfo(place, parkingInfoContainer); // give place, parkingInfoContainer to ParkingInfo
    parkingCost(place, parkingDetail, parkingInfoContainer); // give place, parkingDetail, parkingInfoContainer to parkingCost
    ParkingOpeningHour(place, parkingInfoContainer); // give place, parkingInfoContainer to ParkingOpeningHour
    return "showParkingDetails worked"; // return showParkingDetails to state that everything worked
}

function ParkingInfo(place, container) {
  const ParkingInfo = createSection(container, "div", "parkingInfo", "parkingInfo"); //create ParkingInfo inside container
  createSection(ParkingInfo, "h1", "subHeader", "subHeader", "Parking Info"); // show subHeader inside ParkingInfo
  const ParkingInfoContainer = createSection(ParkingInfo, "ul", "ParkingInfo_ul", "ParkingInfo_ul");  //create ParkingInfoContainer inside ParkingInfo
  data(ParkingInfoContainer, place.name, "ParkingInfo_name"); // show place.name inside ParkingInfoContainer
  data(ParkingInfoContainer, place.formatted_address, "ParkingInfo_address");  // show place.formatted_address inside ParkingInfoContainer
  data(ParkingInfoContainer, place.formatted_phone_number, "ParkingInfo_phoneNumber");  // show place.formatted_phone_number inside ParkingInfoContainer
  return "ParkingInfo"; // return ParkingInfo to state that everything worked
}

function parkingCost(place, parkingDetail, container) {
  const parkingCost = createSection(container, "div", "parkingCost", "parkingCost");  //create parkingCost inside container
  createSection(parkingCost, "h1", "subHeader", "subHeader", "Rates");  // show subHeader inside parkingCost
  const ParkingCostContainer = createSection(parkingCost, "ul", "ParkingCost_ul", "ParkingCost_ul");   //create ParkingCostContainer inside parkingCost
  costData(ParkingCostContainer, '15 Minutes:','£', parkingDetail.cost15Min, "cost15Min"); // show place.cost15Min inside ParkingCostContainer
  costData(ParkingCostContainer, '30 Minutes:','£',parkingDetail.cost30Min, "cost30Min"); // show place.cost30Min inside ParkingCostContainer
  costData(ParkingCostContainer, '1 Hour:', '£', parkingDetail.cost1Hour, "cost1Hour"); // show place.cost1Hour inside ParkingCostContainer
  costData(ParkingCostContainer, 'Additional Hour:', '£', parkingDetail.costAdditionalHour, "costAdditionalHour"); // show place.costAdditionalHour inside ParkingCostContainer
  return "parkingCost"; // return parkingCost to state that everything worked
}

function ParkingOpeningHour(place, container) {
  const ParkingOpeningHour = createSection(container, "div", "ParkingOpeningHour", "ParkingOpeningHour")   //create ParkingOpeningHour inside container
  createSection(ParkingOpeningHour, "h1", "subHeader", "subHeader", "Opening Hours")  // show subHeader inside ParkingOpeningHour
  const ParkingTimeContainer = createSection(ParkingOpeningHour, "ul", "ParkingOpeningHours_ul", "ParkingOpeningHours_ul") //create ParkingTimeContainer inside ParkingOpeningHour
  try { // gets opening hours for each day and displays it on ParkingTimeContainer
    for (const ParkingTime of place.opening_hours.weekday_text) { // go trough all items in place.opening_hours.weekday_text
      data(ParkingTimeContainer, ParkingTime , "ParkingTime_openingHours");  // show ParkingTime inside ParkingTimeContainer
    }
    return "ParkingOpeningHour OK"; // return ParkingOpeningHour OK
  } catch (e) { // if error is given,then the program will show that there is no opening info available
    data(ParkingTimeContainer, "Opening Hours Not Available", "ParkingTime_openingHours");  // show Opening Hours Not Available inside ParkingTimeContainer
    return "ParkingOpeningHour Failed"; // return ParkingOpeningHour Failed
  }
}

function data(container, value, string){ // checks if cost data is not undefined, if available show data, else show Not Available:
  const dataType = document.createElement('li'); // create li element and assign it to dataType
  try {  // if inputs are valid
    if(value != undefined){ // if value is not undefined
        dataType.id = string; // assign id
        dataType.classList = string; // assign class
        dataType.textContent = `${value}`;  // assign textContent
        container.appendChild(dataType); // append dataType inside container
        return dataType; // return dataType
    } else {  // if value is undefined
        dataType.id = string; // assign id
        dataType.classList = string; // assign class
        dataType.textContent = `Not Available: ${string}`;  // assign textContent
        container.appendChild(dataType);  // append dataType inside container
        return dataType; //return dataType
    }
  } catch (e) { // return fail
    return "data failed"
  }
}

function costData(container, stringContent, moneySign, value, class_id){ // checks if cost data is not undefined, if available show cost data, else show Not Available:
  const dataType = document.createElement('li'); // create li element and assign it to dataType
  try {   // if inputs are valid
    if(value != undefined){  // if value is not undefined
        dataType.id = class_id;  // assign id
        dataType.classList = class_id; // assign class
        dataType.textContent =  `${stringContent}  ${moneySign} ${value.toFixed(2)} `;  // assign textContent
        container.appendChild(dataType); // append dataType inside container
        return dataType; // return dataType
    } else {
        dataType.id = class_id;  // assign id
        dataType.classList = class_id; // assign class
        dataType.textContent = `Not Available: ${class_id}`;  // assign textContent
        container.appendChild(dataType); // append dataType inside container
        return dataType; // return dataType
    }
  } catch (e) { // return fail
    return "costData failed";
  }
}

function loadCostDetails(place){
    const date = getDate(); // assign getDate to date
    try { // splits up the array opening_hours
      const opening_hours = place.opening_hours.weekday_text;
      const time24 = openCloseTimes24Hours(opening_hours, date);
      if(Number(time24.getTime) == 24){ // Opening Hours: Open 24 Hours
        createTicket("00:00", "23:59", false);
      } else {  // Opening Hours: Open specific Hours
        const time = openCloseTimes(opening_hours, date); // assign openCloseTimes to time
        const openClose = getOpenCloseTimes(time); //  get open and close times asigned to openClose
        createTicket(openClose.getOpenTime, openClose.getCloseTime, false);   // give getOpenTime, getCloseTime and disabled false to createTicket
      }
    } catch (e) { // this is here if Open hour dont exist
      createTicket("00:00", "00:00", true); // make open and close time "00:00 and disabled true to createTicket
    }
    return "loadCostDetails works"; //return loadCostDetails
}

function getDate() {
  const date = new Date(); // assign new Date to date
  const currentDate = date.toISOString().slice(0,10); //slice date and assign to currentDate
  let todaysDate;
  if (date.getDay() == 0) { // if day equals 0 make it 6
    todaysDate = 6;
  } else { // todays date = day - 1
    todaysDate = date.getDay() - 1;
  }
  return {currentDate, todaysDate}; // return currentDate, todaysDate
}

function createTicket(openTime, closeTime , disabled) {
  const date = getDate();  // assign getDate to date
  const ticketContainer = document.getElementById("ticketContainer"); // get element by id and assign it to ticketContainer
  const ticketForm = createForm(ticketContainer, "ticketForm", "ticketForm", "ticket");  // create ticketForm inside ticketContainer

  createSection(ticketForm, "h1", "subHeader", "subHeader", "Buy a ticket"); // show/create subHeader inside ticketForm

  const parkingID = createSection(ticketForm, "div", "parkingID", "parkingID"); // create parkingID inside ticketForm
  createLabel(parkingID, "Parking-ID");  // show/create Parking-ID inside parkingID
  ticketDataDate(parkingID, "id", getParkingDetail_Id() , disabled); // show/create getParkingDetail_Id inside parkingID

  const checkIn = createSection(ticketForm, "div", "checkIn", "checkIn");// create checkIn inside ticketForm
  createLabel(checkIn, "Arrivel Date");// show/create Arrivel Date inside checkIn
  ticketDataDate(checkIn, "date", date.currentDate, disabled); // show/create date.currentDate inside checkIn

  const timeIn = createSection(ticketForm, "div", "time", "timeIn");// create timeIn inside ticketForm
  createLabel(timeIn, "Time-In"); // show/createTime-In inside timeIn
  ticketDataTime(timeIn, "time", openTime, closeTime, openTime, disabled); // show/create openTime inside timeIn

  const timeOut = createSection(ticketForm,"div", "time", "timeOut"); // create timeOut inside ticketForm
  createLabel(timeOut, "Time-Out");  // show/create Time-Out inside timeOut
  ticketDataTime(timeOut, "time", openTime, closeTime, closeTime, disabled); // show/create closeTime inside timeOut

  const prevTicket_btn = createSection(ticketForm,"div", "prevTicket_btn", "prevTicket_btn");  // create prevTicket_btn inside ticketForm
  createprevTicket(prevTicket_btn, "submit", "Preview Ticket", disabled);  // show/create button inside prevTicket_btn

  return "createTicket all good"; // return createTicket
}

function createForm(container, classHere, idHere, action){ // form maker
  try { // if inputs are valid
    const form = document.createElement("form"); // create form
    form.classList = classHere;  // assign class
    form.id = idHere;  // assign id
    form.action = action;  // assign action
    container.appendChild(form); // append form inside container
    return form; // retrun form
  } catch (e) { // return fail
    return "createForm didnt work";
  }
}

function createSection(container,dataType, classHere, idHere, textContent){ // section maker
  try { // if inputs are valid
    const section = document.createElement(dataType); // create element
    section.classList = classHere;  // assign class
    section.id = idHere;  // assign id
    section.textContent = textContent;  // assign textContent
    container.appendChild(section);// append section inside container
    return section;
  } catch (e) { // return fail
    return "createSection didnt work";
  }
}

function createLabel(container, string){ // label maker
  try { // if inputs are valid
    const label = document.createElement('label'); // create input
    label.textContent = string; // create textContent
    container.appendChild(label); // append label inside container
    return label; // return label
  } catch (e) { // return fail
    return "createLabel didnt work";
  }
}

function ticketDataDate(container, type, value, disabled){ // Creats input section for ticket Date
  try { // if inputs are valid
    const ticketData = document.createElement('input'); // create input
    ticketData.type = type; // assign type
    ticketData.name = type;  // assign name
    ticketData.value = value; // assign value
    ticketData.required = "true";  // assign required
    ticketData.disabled = disabled; // assign disabled
    container.appendChild(ticketData); // append ticketData inside container
    return ticketData; // return ticketData
  } catch (e) { // return fail
      return "ticketDataDate didnt work";
  }
}

function ticketDataTime(container, type, open, close, displayTime, disabled){ // Creats input section for ticket time
  try { // if inputs are valid
    const dataTime = document.createElement('input'); // create input
    dataTime.type = type;  // assign type
    dataTime.name = type;  // assign name
    dataTime.min = open;  // assign min
    dataTime.max = close;  // assign max
    dataTime.value = displayTime;  // assign value
    dataTime.required = "true";  // assign required
    dataTime.disabled = disabled;  // assign disabled
    container.appendChild(dataTime); // append dataTime inside container
    return dataTime; // return dataTime
  } catch (e) { // return fail
    return  "ticketDataTime didnt work";
  }
}

function createprevTicket(container, type, value, disabled){ // Creats button for prev Ticket
  try { // if inputs are valid
    const button = document.createElement('input'); // create input
    button.type = type;  // assign type
    button.value = value;  // assign value
    button.disabled = disabled;  // assign disabled
    container.appendChild(button); // append button inside container
    return button; // return button
  } catch (e) { // return fail
    return "createprevTicket didnt work";
  }
}

function openCloseTimes24Hours(opening_hours, date) {
  const openSplit = opening_hours[date.todaysDate].split(" "); // split openSplit where theres a space
  const getOpenTimeHour = openSplit[0];// assign getOpenTimeHour first part of openSplit
  const getOpenClose = openSplit[1];// assign getOpenClose second part of openSplit
  const getTime = openSplit[2];// assign getTime third part of openSplit
  const getHours = openSplit[3];// assign getHours fourth part of openSplit
  return {getOpenTimeHour, getOpenClose, getTime, getHours}; // return variables
}

function openCloseTimes(opening_hours, date) {
  const openSplit = opening_hours[date.todaysDate].split(" "); // split opening_hours where theres a space
  const openTime = openSplit[1].split(":"); // split openSplit where theres : and assign to openTime
  const openTimeHour = openTime[0]; // assign openTimeHour first part of openTime
  const openTimeMin = openTime[1]; // assign openTimeMin second part of openTime
  const openTime_AM_PM = openSplit[2]; // assign openTime_AM_PM third part of openTime
  const closeTime = openSplit[4].split(":"); // split openSplit where theres : and assign to closeTime
  const closeTimeHour = closeTime[0]; // assign closeTimeHour first part of closeTime
  const closeTimeMin = closeTime[1]; // assign closeTimeMin second part of closeTime
  const closeTime_AM_PM = openSplit[5]; // assign closeTime_AM_PM sixth part of closeTime
  return {openSplit, openTime, openTimeHour, openTimeMin, openTime_AM_PM,closeTime, closeTimeHour, closeTimeMin, closeTime_AM_PM }; // return variables
}

function getOpenCloseTimes(time) {
  let getOpenTime, getCloseTime; // diffin variabls
  if(time.openTime_AM_PM == "AM" || time.openTime_AM_PM == "am" ){ // when parking spacess opens at AM
    getOpenTime = `${checkTime(Number(time.openTimeHour))}:${time.openTimeMin}`; // assign  getOpenTime parking spaces open time
  } else { // when parking spacess opens at PM
    getOpenTime = `${Number(time.openTimeHour) + 12}:${time.openTimeMin}`; // assign getOpenTime parking spaces open time
  }
  if(time.closeTime_AM_PM == "PM" || time.closeTime_AM_PM == "pm" ){ // when the parking spaces close PM
    getCloseTime = `${ Number(time.closeTimeHour) + 12}:${time.closeTimeMin}`; // assign  getCloseTime parking spaces close time
  } else { // when the parking spaces close AM
    getCloseTime = `${checkTime(Number(time.closeTimeHour))}:${time.closeTimeMin}`; // assign  getCloseTime parking spaces close time
  }
  return {getOpenTime, getCloseTime}; // return getOpenTime, getCloseTime
}

function checkTime(number) { // check time
  if (number < 10) {   // check if number less then 10
    number = "0" + number; // adds 0 before number value to show time as a double didget
  }
  return number; // return number
}

function pageLoaded() { // all the functions that are to load when the page loads
  loadParkingDetail();
}

window.addEventListener('load', pageLoaded); // load pageLoaded when html page loads

module.exports = { // export modules
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

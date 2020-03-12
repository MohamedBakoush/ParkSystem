'use strict';

function splitHref() {
  const splitTicket = window.location.href.split("ticket",2);
  const splitCheck = splitTicket[1].split("?id=");
  const split_date_time = splitCheck[1].split("&time=");
  const split_id_date = split_date_time[0].split("&date=");
  const parkingID = split_id_date[0];
  const checkInDate = split_id_date[1];
  const checkInTime = split_date_time[1];
  const split_time_checkIn_HourMin = checkInTime.split("%3A");
  const checkInHour = split_time_checkIn_HourMin[0];
  const checkInMin = split_time_checkIn_HourMin[1];
  const checkOutTime = split_date_time[2];
  const split_time_checkOut_HourMin = checkOutTime.split("%3A");
  const checkOutHour = split_time_checkOut_HourMin[0];
  const checkOutMin = split_time_checkOut_HourMin[1];
  return[parkingID, checkInDate, checkInHour, checkInMin, checkOutHour, checkOutMin]
}

function calculateTime(checkInHour, checkInMin, checkOutHour, checkOutMin ) {
  // calculate time hout/min diffrence
  let timeDiffrenceHour = checkOutHour - checkInHour;
  let timeDiffrenceMin = checkOutMin - checkInMin;

  if (timeDiffrenceMin < 0) {
    timeDiffrenceMin = checkInMin - checkOutMin; // if number timeDiffrenceMin is negative then reverse the check in and check out to get a possitive value then
    timeDiffrenceMin = 60 - timeDiffrenceMin;     //  - by 60  (hour is 60 sec)
    timeDiffrenceHour = timeDiffrenceHour - 1;     // timeDiffrenceHour - 1  = to take in consideration for min change
    }else {
     timeDiffrenceMin = checkTime(timeDiffrenceMin); // checkTIme - if timeDiffrenceMin is singel diget then add 0 infromt of number
    }

   if (timeDiffrenceHour < 0) { // when timeDiffrenceHour is negative show error
     timeDiffrenceHour = "TotalTime";
     timeDiffrenceMin = "Error";
   } else{  // checkTime - if timeDiffrenceHour is singel diget then add 0 infront of number
    timeDiffrenceHour = checkTime(timeDiffrenceHour);
    }
  // add Hour,Min together
  const timeCheckIn = `${checkInHour}:${checkInMin}`;
  const timeCheckOut = `${checkOutHour}:${checkOutMin}`;
  const totalTimeDiffrence = `${timeDiffrenceHour}:${timeDiffrenceMin}`;

  return [timeCheckIn, timeCheckOut, totalTimeDiffrence, timeDiffrenceHour, timeDiffrenceMin];
}

function getById(idName) {
  const container = document.getElementById(idName);
  return container;
}

function costData(container, costCurrency, costContent, createElementType, classHere, idHere) {
  if (isNaN(costContent) == false) { //if cost is not a number then
    ticketData(container, `${costCurrency}${costContent}`, createElementType, classHere, idHere);
    return "costContent is not Null";
  } else{ // if cost is a number
    ticketData(container, `Parking Cost Not Available`, createElementType, classHere, idHere);
    return "costContent is Null";
  }
}

function calculateCost(parkingDetail, timeDiffrenceHour, timeDiffrenceMin) {
  let cost = 0;
  if(timeDiffrenceHour >= 1){ // when timeDiffrenceHour is 1 or greater add initial cost
    cost = cost + parkingDetail.cost1Hour;
    if (timeDiffrenceHour < 2) { // if timeDiffrenceHour is lest then 2 hours but still greater then 1 hour then only add 1 additional hour to the initial cost
      cost = cost + parkingDetail.costAdditionalHour;
    }else{ // depending on timeDiffrenceHour - inital hour add as additional hours
      cost = cost + (parkingDetail.costAdditionalHour * (timeDiffrenceHour - 1))
      if(timeDiffrenceMin > 1){ // if there is a time diffrence in min then add an additional hour
        cost = cost + parkingDetail.costAdditionalHour;
      }
    }
  }else{ // if timeDiffrenceHour is less then 1 hour
    if(timeDiffrenceMin <= 15){ // less then 15 min
      cost = parkingDetail.cost15Min;
    } else if(timeDiffrenceMin <= 30){ // less then 30 min
      cost = parkingDetail.cost30Min;
    } else if(timeDiffrenceMin > 30){  // more then 30 min but still less then 1 hour
      cost = parkingDetail.cost1Hour;
    }
  }
  return cost;
}

// shows BuyTicket button in html
function createBuyTicket(container, type, value, disabled, classHere, idHere){
  const button = document.createElement('input');
  button.type = type;
  button.value = value;
  button.classList = classHere;
  button.id = idHere;
  button.disabled = disabled;
  container.appendChild(button);
  return button;
}

// shows ticket data in html
function ticketData(container, textContent, datatype, classHere, idHere){
  const ticketData = document.createElement(datatype);
  ticketData.textContent = textContent;
  ticketData.classList = classHere;
  ticketData.id = idHere;
  container.appendChild(ticketData);
  return ticketData;
}

// if time is less the then 10 it will show as a singel didget
//  this function adds a 0 before the i value to show time as a double didget
function checkTime(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

function getParkingDetail_Id() {
  const splitHerf = window.location.href.split("ticket?id=",2);
  const split_id_date = splitHerf[1].split("&");
  const parkingID = split_id_date[0];
  return parkingID;
};

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
  getTicketInfo(parkingDetail);
  return parkingDetail;
}

function getTicketInfo(parkingDetail) {
  // speperates the herf into diffrent sections
  // parking id, date , check in time and check out time
  const ticketHrefData = splitHref();
  const parkingID = ticketHrefData[0];
  const checkInDate = ticketHrefData[1];
  const checkInHour = ticketHrefData[2];
  const checkInMin = ticketHrefData[3];
  const checkOutHour = ticketHrefData[4];
  const checkOutMin = ticketHrefData[5];

  const time = calculateTime(checkInHour, checkInMin, checkOutHour, checkOutMin);
  const timeCheckIn = time[0];
  const timeCheckOut = time[1];
  const totalTimeDiffrence = time[2];
  const timeDiffrenceHour = time[3];
  const timeDiffrenceMin = time[4];

  const cost = calculateCost(parkingDetail, timeDiffrenceHour, timeDiffrenceMin );

  // get element id from ticket.html
  const timeCheckInContainer = getById("TimeCheckIn");
  const timeCheckOutContainer = getById("TimeCheckOut");
  const timeDiffrenceContainer = getById("TimeDiffrence");
  const dateDiffrenceContainer = getById("DateDiffrence");
  const costContainer = getById("parkingCostFinal");
  const buyTicket_btn = getById("buyTicket_btn");
 // shows ticket data in html
  ticketData(timeCheckInContainer, timeCheckIn, "p", "timeCheckIn", "timeCheckIn");
  ticketData(timeCheckOutContainer, timeCheckOut, "p", "timeCheckOut", "timeCheckOut");
  ticketData(timeDiffrenceContainer, totalTimeDiffrence, "p", "timeDiffrence", "timeDiffrence");
  ticketData(dateDiffrenceContainer, checkInDate, "p", "dateDiffrence", "dateDiffrence");
  costData(costContainer, "£", cost, "p", "finalCost", "finalCost");
  createBuyTicket(buyTicket_btn, "submit", "Buy Ticket", true, "buyTicket", "buyTicket");
}

function pageLoaded() {
   loadParkingDetail();
}

window.addEventListener('load', pageLoaded);

module.exports = {
  // export modules
  splitHref,
  calculateTime,
  getById,
  costData,
  calculateCost,
  createBuyTicket,
  ticketData,
  checkTime,
  getParkingDetail_Id,
  loadParkingDetail,
  getTicketInfo,
};

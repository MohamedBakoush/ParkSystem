'use strict';

function splitHref() { // splitting up the url to get data that was sent from parkingInfo
  const splitTicket = window.location.href.split("ticket",2); // split url at ticket
  const splitCheck = splitTicket[1].split("?id="); // split at splitTicket ?id=
  const split_date_time = splitCheck[1].split("&time="); // split at splitCheck &time=
  const split_id_date = split_date_time[0].split("&date="); // split at split_date_time &date=
  const parkingID = split_id_date[0]; // id taken from url
  const checkInDate = split_id_date[1]; // check in date from url
  const checkInTime = split_date_time[1]; // check in time from url
  const split_time_checkIn_HourMin = checkInTime.split("%3A");
  const checkInHour = split_time_checkIn_HourMin[0]; // check in hour from url
  const checkInMin = split_time_checkIn_HourMin[1];// check in min from url
  const checkOutTime = split_date_time[2]; // check out time from url
  const split_time_checkOut_HourMin = checkOutTime.split("%3A");
  const checkOutHour = split_time_checkOut_HourMin[0]; // check out hour from url
  const checkOutMin = split_time_checkOut_HourMin[1]; // check out min from url
  return {parkingID, checkInDate, checkInHour, checkInMin, checkOutHour, checkOutMin}; // return all variables
}

function calculateTime(checkInHour, checkInMin, checkOutHour, checkOutMin ) { // calculate time hour/min diffrence
  let timeDiffrenceHour = checkOutHour - checkInHour; // time Diffrence Hour
  let timeDiffrenceMin = checkOutMin - checkInMin; // time Diffrence Min

  if (timeDiffrenceMin < 0) { // if number timeDiffrenceMin is negative
    timeDiffrenceMin = checkInMin - checkOutMin; // reverse check in and check out to get a possitive value
    timeDiffrenceMin = 60 - timeDiffrenceMin; // minus by 60  (hour is 60 sec)
    timeDiffrenceHour = timeDiffrenceHour - 1; // timeDiffrenceHour - 1  = to take in consideration for min change
    }else { // if timeDiffrenceMin is singel diget then add 0 infromt of number
     timeDiffrenceMin = checkTime(timeDiffrenceMin);
    }

   if (timeDiffrenceHour < 0) { // when timeDiffrenceHour is negative show error
     timeDiffrenceHour = "TotalTime";
     timeDiffrenceMin = "Error";
   } else{  // if timeDiffrenceHour is singel diget then add 0 infront of number
    timeDiffrenceHour = checkTime(timeDiffrenceHour);
    }

  const timeCheckIn = `${checkInHour}:${checkInMin}`;   // add Hour,Min together for time in
  const timeCheckOut = `${checkOutHour}:${checkOutMin}`;   // add Hour,Min together for time out
  const totalTimeDiffrence = `${timeDiffrenceHour}:${timeDiffrenceMin}`; // add Hour,Min together for total time diffrence

  return {timeCheckIn, timeCheckOut, totalTimeDiffrence, timeDiffrenceHour, timeDiffrenceMin}; // return all variables
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

function calculateCost(parkingDetail, timeDiffrenceHour, timeDiffrenceMin) { // calculate ticket Cost
  let cost = 0; // initialy cost is qual to 0
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
  } else{ // if timeDiffrenceHour is less then 1 hour
    if(timeDiffrenceMin <= 15){ // less then 15 min
      cost = parkingDetail.cost15Min; // cost gets cost15Min from parkingDetail
    } else if(timeDiffrenceMin <= 30){ // less then 30 min
      cost = parkingDetail.cost30Min; // cost gets cost30Min from parkingDetail
    } else if(timeDiffrenceMin > 30){  // more then 30 min but still less then 1 hour
      cost = parkingDetail.cost1Hour; // cost gets cost1Hour from parkingDetail
    }
  }
  return cost;
}

function createBuyTicket(container, type, value, disabled, classHere, idHere){ // create input a element for button
  try {  // if inputs are valid
    const button = document.createElement('input'); // create input element
    button.type = type; // assign type
    button.value = value; // assign value
    button.classList = classHere; // assign class
    button.id = idHere; // assign id
    button.disabled = disabled; // make disabled
    container.appendChild(button); // append button into container
    return button; // return button
  } catch (e) { // reutn fail
      return "createBuyTicket Failed"
  }
}

function ticketData(container, textContent, datatype, classHere, idHere){ // create section for ticket Data
    try { // if inputs are valid
      const ticketData = document.createElement(datatype); // create element
      ticketData.textContent = textContent; // assign textContent
      ticketData.classList = classHere; // assign class
      ticketData.id = idHere; // assig id
      container.appendChild(ticketData); // append ticketData into container
      return ticketData; // return ticketData
    } catch (e) { // reutn fail
      return "ticketData failed"
    }
}

function checkTime(number) { // check time
  if (number < 10) {  // check if number less then 10
    number = "0" + number; // adds 0 before number value to show time as a double didget
  }
  return number; // return number
}

function getParkingDetail_Id() { // get id from url
  const splitHerf = window.location.href.split("ticket?id=",2); // splut url at ticket?id=
  const split_id_date = splitHerf[1].split("&"); // splitHerf url at &
  const parkingID = split_id_date[0]; //  id taken from url
  return parkingID; // return id
}

async function loadParkingDetail() { // load parking details
  const id = getParkingDetail_Id(); // assign id from getParkingDetail_Id
  const response = await fetch(`parkingDetails/${id}`);  // fetch parkingDetails with provided id
  let parkingDetail;
  if (response.ok) { // if response is ok assign parkingDetail with data from database
    parkingDetail = await response.json();
  } else { // if respons fails assign parkingDetail with error message
    parkingDetail = { msg: 'failed to load messages' };
  }
  getTicketInfo(parkingDetail); // give getTicketInfo parkingDetail
  return parkingDetail; // return parkingDetail
}

function getTicketInfo(parkingDetail) {  // header Ticket Info thats being displayed in html
  const herfData = splitHref(); // assign splitHref to herfData
  const time = calculateTime(herfData.checkInHour, herfData.checkInMin, herfData.checkOutHour, herfData.checkOutMin); // assign time with calculated time
  const cost = calculateCost(parkingDetail, time.timeDiffrenceHour, time.timeDiffrenceMin ); // assign cost with calculated cost

  const ticketBody = document.getElementById("ticketBody");  // assign ticketBody with ticketBody id from html

  const ticketForm = createSection(ticketBody, "div", "ticketForm", "ticketForm"); // create ticket form container
  createSection(ticketForm, "h1", "ticketHeader", "ticketHeader", "Parking Space Details"); // show ticketHeader inside ticketForm

  const dateDiffrenceContainer = createSection(ticketForm, "div", "DateDiffrence", "DateDiffrence"); // create dateDiffrenceContainer inside ticketForm
  createSection(dateDiffrenceContainer, "h1", "", "", "Date:"); // show/create Date header  inside dateDiffrenceContainer
  ticketData(dateDiffrenceContainer, herfData.checkInDate, "p", "dateDiffrence", "dateDiffrence"); // show/create checkInDate data inside dateDiffrenceContainer

  const timeCheckInContainer = createSection(ticketForm, "div", "TimeCheckIn", "TimeCheckIn"); // create timeCheckInContainer inside ticketForm
  createSection(timeCheckInContainer, "h1", "", "", "TimeCheckIn:"); // show/create TimeCheckIn header inside timeCheckInContainer
  ticketData(timeCheckInContainer, time.timeCheckIn, "p", "timeCheckIn", "timeCheckIn"); // show/create timeCheckIn data inside timeCheckInContainer

  const timeCheckOutContainer = createSection(ticketForm, "div", "TimeCheckOut", "TimeCheckOut"); // create timeCheckOutContainer inside ticketForm
  createSection(timeCheckOutContainer, "h1", "", "", "TimeCheckOut:");  // show/create TimeCheckOut header inside timeCheckOutContainer
  ticketData(timeCheckOutContainer, time.timeCheckOut, "p", "timeCheckOut", "timeCheckOut");  // show/create timeCheckOut data inside timeCheckOutContainer

  const timeDiffrenceContainer = createSection(ticketForm, "div", "TimeDiffrence", "TimeDiffrence"); // create timeDiffrenceContainer inside ticketForm
  createSection(timeDiffrenceContainer, "h1", "", "", "Total Time Stay:");  // show/create Total Time Stay header
  ticketData(timeDiffrenceContainer, time.totalTimeDiffrence, "p", "timeDiffrence", "timeDiffrence");  // show/create totalTimeDiffrence data


  const costContainer = createSection(ticketForm, "div", "parkingCostFinal", "parkingCostFinal"); // create costContainer inside ticketForm
  createSection(costContainer, "h1", "", "", "Total Cost:");  // show/create Total Cost header inside costContainer
  costData(costContainer, "£", cost, "p", "finalCost", "finalCost");  // show/create cost data  inside costContainer

  const buyTicket_btn = createSection(ticketForm, "div", "buyTicket_btn", "buyTicket_btn"); // create buyTicket_btn Container inside ticketForm
  createBuyTicket(buyTicket_btn, "submit", "Buy Ticket", true, "buyTicket", "buyTicket");  // show/create buyTicket button inside buyTicket_btn

  return "getTicketInfo worked"; // retun data got sent
}

function createSection(container, dataType, classHere, idHere, string){
  try {  // if inputs are valid
    const section = document.createElement(dataType); // create element
    section.classList = classHere; // create class
    section.id = idHere; // create id
    section.textContent = string; // create textContent
    container.appendChild(section); // append section in container
    return section; // return section
  } catch (e) { // return fail
    return "createSection didnt work";
  }
}

function pageLoaded() { // all the functions that are to load when the page loads
   loadParkingDetail();
}

window.addEventListener('load', pageLoaded); // load pageLoaded when html page loads

module.exports = { // export modules
  splitHref,
  calculateTime,
  costData,
  calculateCost,
  createBuyTicket,
  ticketData,
  checkTime,
  getParkingDetail_Id,
  loadParkingDetail,
  getTicketInfo,
  createSection,
};

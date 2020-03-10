'use strict';
const getTicketInfo = async (parkingDetail) => {
  // speperates the herf into diffrent sections
  // parking id, date , check in time and check out time
 const splitTicket = window.location.href.split("ticket",2);
 const splitCheck = splitTicket[1].split("?id=");
 const split_date_time = splitCheck[1].split("&time=");
 const split_id_date = split_date_time[0].split("&date=");
 const parkingID = split_id_date[0];
 const checkInDate = split_id_date[1];
 const checkInTime = split_date_time[1];
 const split_time_checkIn_HourMin = checkInTime.split("%3A");
 const checkOutTime = split_date_time[2];
 const split_time_checkOut_HourMin = checkOutTime.split("%3A");
 // calculates timeDiffrenceHour
 let timeDiffrenceHour = split_time_checkOut_HourMin[0] - split_time_checkIn_HourMin[0];
  // calculates timeDiffrenceMin
 let timeDiffrenceMin = split_time_checkOut_HourMin[1] - split_time_checkIn_HourMin[1];

 if (timeDiffrenceMin < 0) {
   // if number timeDiffrenceMin is negative then reverse the check in and check out to get a possitive value then
   //  - by 60  (hour is 60 sec)
   // timeDiffrenceHour - 1  = to take in consideration for min change
   timeDiffrenceMin = split_time_checkIn_HourMin[1] - split_time_checkOut_HourMin[1];
   timeDiffrenceMin = 60 - timeDiffrenceMin;
   timeDiffrenceHour = timeDiffrenceHour - 1;
 }
 if (timeDiffrenceMin < 10) {
   // checkTIme - if timeDiffrenceMin is singel diget then add 0 infromt of number
  timeDiffrenceMin = checkTime(timeDiffrenceMin);
 }

  if (timeDiffrenceHour < 0) {
    // when timeDiffrenceHour is negative show error
    timeDiffrenceHour = "TotalTime";
    timeDiffrenceMin = "Error";
  } else if (timeDiffrenceHour < 10) {
    // checkTime - if timeDiffrenceHour is singel diget then add 0 infront of number
   timeDiffrenceHour = checkTime(timeDiffrenceHour);
   }
 // add timeCheckIn Hour,Min together
 const  timeCheckIn = `${split_time_checkIn_HourMin[0]}:${split_time_checkIn_HourMin[1]}`;
 // add timeCheckOut Hour,Min together
 const  timeCheckOut = `${split_time_checkOut_HourMin[0]}:${split_time_checkOut_HourMin[1]}`;
 // add totalTimeDiffrence Hour,Min together
 const totalTimeDiffrence = `${timeDiffrenceHour}:${timeDiffrenceMin}`;

  let cost = 0;
  if(timeDiffrenceHour >= 1){ // when timeDiffrenceHour is 1 or greater add initial cost
    console.log("pay 1 hour");
    cost = cost + parkingDetail.cost1Hour;
    console.log("cost:", cost);
    if (timeDiffrenceHour < 2) { // if timeDiffrenceHour is lest then 2 hours but still greater then 1 hour then only add 1 additional hour to the initial cost
          console.log("additional hours");
          cost = cost + parkingDetail.costAdditionalHour;
          console.log("cost:", cost);
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

 // get element id from ticket.html
  const CostContainer = document.getElementById("parkingCostFinal");
  const TimeCheckInContainer = document.getElementById("TimeCheckIn");
  const TimeCheckOutContainer = document.getElementById("TimeCheckOut");
  const TimeDiffrenceContainer = document.getElementById("TimeDiffrence");
  const DateDiffrenceContainer = document.getElementById("DateDiffrence");
 // shows ticket data in html
  ticketData(TimeCheckInContainer, `${timeCheckIn}`, "p", "timeCheckIn", "timeCheckIn");
  ticketData(TimeCheckOutContainer, `${timeCheckOut}`, "p", "timeCheckOut", "timeCheckOut");
  ticketData(TimeDiffrenceContainer, `${totalTimeDiffrence}`, "p", "timeDiffrence", "timeDiffrence");
  ticketData(DateDiffrenceContainer, `${checkInDate}`, "p", "dateDiffrence", "dateDiffrence");
 // get buy ticket id from ticket.html
  const buyTicket_btn = document.getElementById("buyTicket_btn");
  // shows BuyTicket button in html
  createBuyTicket(buyTicket_btn, "submit", "Buy Ticket", true, "buyTicket", "buyTicket");

  if (isNaN(cost) == false) { //if cosy is not a number then
    ticketData(CostContainer, `£${cost}`, "p", "finalCost", "finalCost");
  } else{ // if cost is a number
    ticketData(CostContainer, `Parking Cost Not Available`, "p", "finalCost", "finalCost");
  }
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
}

// shows ticket data in html
function  ticketData(container, textContent, datatype, classHere, idHere){
  const ticketData = document.createElement(datatype);
  ticketData.textContent = textContent;
  ticketData.classList = classHere;
  ticketData.id = idHere;
  container.appendChild(ticketData);
}

// if time is less the then 10 it will show as a singel didget
//  this function adds a 0 before the i value to show time as a double didget
const checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const getParkingDetail_Id = () => {
  const splitHerf = window.location.href.split("ticket?id=",2);
  const split_id_date = splitHerf[1].split("&");
  const parkingID = split_id_date[0];
  return parkingID;
};

const loadParkingDetail = async() => {
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
}

function pageLoaded() {
   // getTicketInfo();
   loadParkingDetail();
}

window.addEventListener('load', pageLoaded);

module.exports = {
  // export modules
  checkTime,
  getParkingDetail_Id,  
};

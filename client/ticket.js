'use strict';
async function getTicketInfo() {
  // splut herf into 2 section
  // split at ticket
 const splitTicket = window.location.href.split("ticket",2);
 // split at ?date= to split into to sections ?date= and the rest
 // reason is to remove ?date= and only have data needed
 const splitCheck = splitTicket[1].split("?date=");
 // split at time to get check in time and check out time and date into 3 sections
 const split_date_time= splitCheck[1].split("&time=");
 // checkInDate becomes split_date_time[0] which is date
 const checkInDate = split_date_time[0];
   // checkInTime becomes split_date_time[1] which is check in time
 const checkInTime = split_date_time[1];
  //split Hour, Min to  (remove) %3A
 const split_time_checkIn_HourMin = checkInTime.split("%3A");
  // checkInTime becomes split_date_time[2] which is check out time
 const checkOutTime = split_date_time[2];
   //split Hour, Min to (remove) %3A
 const split_time_checkOut_HourMin = checkOutTime.split("%3A");
 // calculates timeDiffrenceHour
 let timeDiffrenceHour = split_time_checkOut_HourMin[0] - split_time_checkIn_HourMin[0];
  // calculates timeDiffrenceMin
 let timeDiffrenceMin = split_time_checkOut_HourMin[1] - split_time_checkIn_HourMin[1];
 if (timeDiffrenceMin < 0) { // if number timeDiffrenceMin is negative then reverse the values
   timeDiffrenceMin = split_time_checkIn_HourMin[1] - split_time_checkOut_HourMin[1];
   timeDiffrenceMin = 60 - timeDiffrenceMin;
   timeDiffrenceHour = timeDiffrenceHour - 1;
 }
 if (timeDiffrenceMin < 10) {  // if timeDiffrenceMin is singel diget then add 0 infromt of number
  timeDiffrenceMin = checkTime(timeDiffrenceMin);
 }

  if (timeDiffrenceHour < 0) { // when timeDiffrenceHour is negative it makes all the values timeDiffrenceHour and Min Into a string
    timeDiffrenceHour = "TotalTime";
    timeDiffrenceMin = "Error";
  } else if (timeDiffrenceHour < 10) { // if timeDiffrenceHour is singel diget then add 0 infront of number
   timeDiffrenceHour = checkTime(timeDiffrenceHour);
   }
 // add timeCheckIn Hour,Min together
 const  timeCheckIn = `${split_time_checkIn_HourMin[0]}:${split_time_checkIn_HourMin[1]}`;
 // add timeCheckOut Hour,Min together
 const  timeCheckOut = `${split_time_checkOut_HourMin[0]}:${split_time_checkOut_HourMin[1]}`;
 // add totalTimeDiffrence Hour,Min together
 const totalTimeDiffrence = `${timeDiffrenceHour}:${timeDiffrenceMin}`;
// get element id from ticket.html
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
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function pageLoaded() {
   getTicketInfo();
}

window.addEventListener('load', pageLoaded);

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
      data(ParkingTimeContainer, "Opening Hours Not Available", "ParkingTime_openingHours");
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


async function loadCostDetails(){
  const service = new google.maps.places.PlacesService(map);
  const request = {
    placeId: getParkingDetail_Id(),
    // type of values to get from
    fields: ['opening_hours','opening_hours.weekday_text']
    };
  service.getDetails(request, function(place) {
    // get current Date and Hour/Min
    const date = new Date();
    const currentDate = date.toISOString().slice(0,10);
    currentHour = checkTime(date.getHours());
    currentHMinute = checkTime(date.getMinutes());
    const currentTime = `${currentHour}:${currentHMinute}`;

    // gets Date and depending on the date it will update
    // todays date accordingly
   let todaysDate;
    if(date.getDay() == 1){ todaysDate = 0;
    } else if(date.getDay() == 2) { todaysDate = 1;
    } else if(date.getDay() == 3) { todaysDate = 2;
    } else if(date.getDay() == 4) { todaysDate = 3;
    } else if(date.getDay() == 5) { todaysDate = 4;
    } else if(date.getDay() == 6) { todaysDate = 5;
    } else if(date.getDay() == 7) { todaysDate = 6;
    }
    try {
      const opening_hours = place.opening_hours.weekday_text;
      // splits up the array opening_hours
      const openSplit = opening_hours[todaysDate].split(" ");
      if(openSplit[2] == 24){ // Opening Hours: Open 24 Hours
        console.log(" Open 24 Hours");


        const parkingID = document.getElementById("parkingID");
        createLabel(parkingID, "Parking-ID");
        ticketDataDate(parkingID, "id", getParkingDetail_Id() , false);

        console.log(typeof(getParkingDetail_Id()));
        const checkIn = document.getElementById("checkIn");
        createLabel(checkIn, "Arrivel Date");
        ticketDataDate(checkIn, "date", currentDate, false);

        const timeIn = document.getElementById("timeIn");
        createLabel(timeIn, "Time-In");
        ticketDataTime(timeIn, "time", "00:00", "24:00", "00:00", false);

        const timeOut = document.getElementById("timeOut");
        createLabel(timeOut, "Time-Out");
        ticketDataTime(timeOut, "time", "00:00", "24:00", "23:59", false);

        const prevTicket_btn = document.getElementById("prevTicket_btn");
        createprevTicket(prevTicket_btn, "submit", "Preview Ticket", false);

      } else {  // Opening Hours: Open specific Hours
        console.log("Open specific Hours");
        const opening_hours = place.opening_hours.weekday_text;
        const openSplit = opening_hours[todaysDate].split(" ");
        const splitOpenTime = openSplit[1].split(":");
        const splitCloseTime = openSplit[4].split(":");
        let openStringTime_Open24hr;
        let openStringTime_close24hr;
        // when the parking spaces open 
        if(openSplit[2] == "AM"){
          console.log("Open_AM");
          if (splitOpenTime[0] >= 10){
            openStringTime_Open24hr  =  `${splitOpenTime[0]}:${splitOpenTime[1]}`;
          }else {
            openStringTime_Open24hr  =  `0${splitOpenTime[0]}:${splitOpenTime[1]}`;
          }
        } else {
          console.log("Open_PM");
          openStringTime_Open24hr  =  `${Number(splitOpenTime[0]) + 12}:${splitOpenTime[1]}`;
        }
        // when the parking spaces close
        if(openSplit[5] == "PM"){
          console.log("Closed_PM");
          openStringTime_close24hr  =  `${ Number(splitCloseTime[0]) + 12}:${splitCloseTime[1]}`;
        } else {
          console.log("Closed_AM");
          if (splitCloseTime[0] >= 10){
            openStringTime_close24hr  =  `${splitCloseTime[0]}:${splitCloseTime[1]}`;
          }else {
            openStringTime_close24hr  =  `0${splitCloseTime[0]}:${splitCloseTime[1]}`;
          }
        }

        const parkingID = document.getElementById("parkingID");
        createLabel(parkingID, "Parking-ID");
        ticketDataDate(parkingID, "id", getParkingDetail_Id() , false);

        const checkIn = document.getElementById("checkIn");
        createLabel(checkIn, "Arrivel Date");
        ticketDataDate(checkIn, "date", currentDate, false);


        const timeIn = document.getElementById("timeIn");
        createLabel(timeIn, "Time-In");
        ticketDataTime(timeIn, "time", openStringTime_Open24hr, openStringTime_close24hr, openStringTime_Open24hr, false);

        const timeOut = document.getElementById("timeOut");
        createLabel(timeOut, "Time-Out");
        ticketDataTime(timeOut, "time", openStringTime_Open24hr, openStringTime_close24hr, openStringTime_close24hr, false);

        const prevTicket_btn = document.getElementById("prevTicket_btn");
        createprevTicket(prevTicket_btn, "submit", "Preview Ticket", false);
      }

    } catch (e) { // this is here if Open hour dont exist

      console.log("Open hour dont exist");

      const parkingID = document.getElementById("parkingID");
      createLabel(parkingID, "Parking-ID");
      ticketDataDate(parkingID, "id", getParkingDetail_Id() , false);

      const checkIn = document.getElementById("checkIn");
      createLabel(checkIn, "Arrivel Date");
      ticketDataDate(checkIn, "date", currentDate, true);

      const timeIn = document.getElementById("timeIn");
      createLabel(timeIn, "Time-In");
      ticketDataTime(timeIn, "time", "00:00", "00:00", "00:00", true);

      const timeOut = document.getElementById("timeOut");
      createLabel(timeOut, "Time-Out");
      ticketDataTime(timeOut, "time", "00:00", "00:00", "00:00", true);

      const prevTicket_btn = document.getElementById("prevTicket_btn");
      createprevTicket(prevTicket_btn, "submit", "Preview Ticket", true);
    }
  });

}
// Creats button for prev Ticket
function createprevTicket(container, type, value, disabled){
  const button = document.createElement('input');
  button.type = type;
  button.value = value;
  button.disabled = disabled;
  container.appendChild(button);
}
// label maker
function createLabel(container, string){
  const label = document.createElement('label');
  label.textContent = string;
  container.appendChild(label);
}
// Creats input section for ticket Date
function ticketDataDate(container, type, value, disabled){
  const input = document.createElement('input');
  input.type = type;
  input.name = type;
  input.value = value;
  input.required = "true";
  input.disabled = disabled;
  container.appendChild(input);
}
// Creats input section for ticket time
function ticketDataTime(container, type, open, close, displayTime, disabled){
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
// if time is less the then 10 it will show as a singel didget
// to avoid show as a double didget this function adds a 0 before the i value
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function pageLoaded() {
  loadParkingDetail();
  loadCostDetails();
}

window.addEventListener('load', pageLoaded);

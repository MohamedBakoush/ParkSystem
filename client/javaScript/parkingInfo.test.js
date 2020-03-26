'use strict'
const { getParkingDetail_Id, loadParkingDetail, createMap,
        showParkingDetails, ParkingInfo, parkingCost,
        ParkingOpeningHour, data, costData, loadCostDetails, getDate,
        createTicket, createForm, createSection, createLabel,
        ticketDataDate, ticketDataTime, createprevTicket, openCloseTimes24Hours,
        openCloseTimes, getOpenCloseTimes, checkTime
    } = require('./parkingInfo'); // import functions from parkingInfo
const {findParkingDetail} = require('../../parkingInfoBoard'); // import findParkingDetail functions from parkingInfoBoard
global.window = Object.create(window);  // create a window
const url = "http://localhost:8080/parkingInfo#ChIJ0XjfNHRddEgRQtXe1fjPW8w"; // set url with parkingInfo (url that would be seen when load parkingInfo.html) url
Object.defineProperty(window, 'location', {
  value: {
    href: url // url that these test will use
  }
});

describe('parkingInfo', function () {
  const createElement = document.createElement("section"); // create an element  for testion purposes
  const parkingDetail = findParkingDetail("ChIJ0XjfNHRddEgRQtXe1fjPW8w");  // get parkingDetail from findParkingDetail by useing id ChIJ0XjfNHRddEgRQtXe1fjPW8w
  const getCurrentDate = new Date(); // assign getCurrentDate Date()
  // assign opening_hours24 an array
  const opening_hours24 = ["Monday: Open 24 hours", "Tuesday: Open 24 hours", "Wednesday: Open 24 hours", "Thursday: Open 24 hours", "Friday: Open 24 hours", "Saturday: Open 24 hours", "Sunday: Open 24 hours"];
  // assign opening_hours an array
  const opening_hours = ["Monday: 8:00 AM – 6:30 PM", "Tuesday: 8:00 AM – 6:30 PM", "Wednesday: 8:00 AM – 6:30 PM", "Thursday: 8:00 AM – 6:30 PM", "Friday: 8:00 AM – 6:30 PM", "Saturday: 8:00 AM – 6:30 PM", "Sunday: 10:00 AM – 4:30 PM"];

  const openSplit = opening_hours[getDate().todaysDate].split(" "); // split openSplit where theres a space
  const openTime = openSplit[1].split(":");  // split openSplit where theres : and assign to openTime
  const openTimeHour = openTime[0]; // assign openTimeHour first part of openTime
  const openTimeMin = openTime[1];  // assign openTimeMin second part of openTime
  const openTime_AM_PM = openSplit[2]; // assign openTime_AM_PM third part of openTime
  const closeTime = openSplit[4].split(":");  // split openSplit where theres : and assign to closeTime
  const closeTimeHour = closeTime[0];  // assign closeTimeHour first part of closeTime
  const closeTimeMin = closeTime[1]; // assign closeTimeMin second part of closeTime
  const closeTime_AM_PM = openSplit[5]; // assign closeTime_AM_PM sixth part of closeTime

  it('Check checkTime', () => { // test for checkTime function
      const timeLess10 = checkTime(1);
      expect(timeLess10).toBeDefined();
      expect(timeLess10).toBe("01");
      expect(typeof timeLess10).toBe("string");
      const time10OrMore = checkTime(27);
      expect(time10OrMore).toBeDefined();
      expect(time10OrMore).toBe(27);
      expect(typeof time10OrMore).toBe("number");
    });
  it('Check getOpenCloseTimes', () => { // test for getOpenCloseTimes function
      const time = openCloseTimes(opening_hours, getDate());
      const getOpenClose = getOpenCloseTimes(time);
      expect(getOpenClose).toBeDefined();
      expect(typeof getOpenClose.getOpenTime).toBe("string");
      expect(typeof getOpenClose.getCloseTime).toBe("string");

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

      expect(getOpenClose.getOpenTime).toStrictEqual(getOpenTime);
      expect(getOpenClose.getCloseTime).toStrictEqual(getCloseTime);
  });

  it('Check openCloseTimes', () => {  // test for openCloseTimes function
    const openClose = openCloseTimes(opening_hours, getDate());
    expect(openClose).toBeDefined();
    expect(openClose.openSplit).toStrictEqual(openSplit);
    expect(openClose.openTime).toStrictEqual(openTime);
    expect(openClose.openTimeHour).toStrictEqual(openTimeHour);
    expect(openClose.openTimeMin).toStrictEqual(openTimeMin);
    expect(openClose.openTime_AM_PM).toStrictEqual(openTime_AM_PM);
    expect(openClose.closeTime).toStrictEqual(closeTime);
    expect(openClose.closeTimeHour).toStrictEqual(closeTimeHour);
    expect(openClose.closeTimeMin).toStrictEqual(closeTimeMin);
    expect(openClose.closeTime_AM_PM).toStrictEqual(closeTime_AM_PM);
  });

  it('Check openCloseTimes24Hours', () => {  // test for openCloseTimes24Hours function
    const time24Hours = openCloseTimes24Hours(opening_hours24, getDate() );
    expect(time24Hours).toBeDefined();
    const openSplit = opening_hours24[getDate().todaysDate].split(" ");
    const getOpenTimeHour = openSplit[0];
    const getOpenClose = openSplit[1];
    const getTime = openSplit[2];
    const getHours = openSplit[3];
    expect(time24Hours.getOpenTimeHour).toBe(getOpenTimeHour);
    expect(time24Hours.getOpenClose).toBe(getOpenClose);
    expect(time24Hours.getTime).toBe(getTime);
    expect(time24Hours.getHours).toBe(getHours);
  });

  it('Check createprevTicket', () => {  // test for createprevTicket function
    const prevTicket = createprevTicket(createElement, "submit", "Preview Ticket", false);
    expect(prevTicket).toBeDefined();
    expect(prevTicket.type).toBe("submit");
    expect(prevTicket.value).toBe("Preview Ticket");
    expect(prevTicket.disabled).toBe(false);

    const prevTicketNA = createprevTicket();
    expect(prevTicketNA).toBeDefined();
    expect(prevTicketNA).toBe("createprevTicket didnt work");
  });

  it('Check ticketDataTime', () => {  // test for ticketDataTime function
    const dateTime = ticketDataTime(createElement, "time", "00:00", "24:00", "00:00", false);
    expect(dateTime).toBeDefined();
    expect(dateTime.type).toBe("time");
    expect(dateTime.name).toBe("time");
    expect(dateTime.min).toBe("00:00");
    expect(dateTime.max).toBe("24:00");
    expect(dateTime.value).toBe("00:00");
    expect(dateTime.required).toBe(true);
    expect(dateTime.disabled).toBe(false);

    const dateTimeNA = ticketDataTime();
    expect(dateTimeNA).toBeDefined();
    expect(dateTimeNA).toBe("ticketDataTime didnt work");
  });

  it('Check ticketDataDate', () => {  // test for ticketDataDate function
    const ticket = ticketDataDate(createElement, "date", getCurrentDate.toISOString().slice(0,10) , false);
    expect(ticket).toBeDefined();
    expect(ticket.type).toBe("date");
    expect(ticket.name).toBe("date");
    expect(ticket.value).toBe(getCurrentDate.toISOString().slice(0,10));
    expect(ticket.required).toBe(true);
    expect(ticket.disabled).toBe(false);

    const ticketNA = ticketDataDate();
    expect(ticketNA).toBeDefined();
    expect(ticketNA).toBe("ticketDataDate didnt work");
  });

  it('Check createTicket', () => { // test for createTicket function
    const ticket = createTicket("00:00", "00:00", true);
    expect(ticket).toBeDefined();
    expect(ticket).toBe("createTicket all good");
  });

  it('Check getDate', () => { // test for getDate function
    let todaysDate;
    if (getCurrentDate.getDay() == 0) {
      todaysDate = 6;
    } else {
      todaysDate = getCurrentDate.getDay() - 1;
    }
    const date = getDate();
    expect(date).toBeDefined();
    expect(date.currentDate).toBe(getCurrentDate.toISOString().slice(0,10));
    expect(date.todaysDate).toBe(todaysDate);
  });

  it('Check createLabel', () => { // test for createLabel function
    const label = createLabel(createElement, "content");
    expect(label).toBeDefined();
    expect(label.textContent).toBe("content");
    const labelNA = createLabel();
    expect(labelNA).toBeDefined();
    expect(labelNA).toBe("createLabel didnt work");
  });

  it('Check loadCostDetails', () => { // test for loadCostDetails function
    const load = loadCostDetails();
    expect(load).toBeDefined();
    expect(load).toBe("loadCostDetails works");
  });

  it('Check costData', () => { // test for costData function
    const costValueDefined = costData(createElement, "stringContent", "$", 4, "class_id");
    expect(costValueDefined).toBeDefined();
    expect(costValueDefined.id).toBe("class_id");
    expect(costValueDefined.classList[0]).toBe("class_id");
    expect(costValueDefined.textContent).toBe("stringContent  $ 4.00 ");
    const costValueUndefined = costData(createElement, "stringContent", "$", undefined, "class_id");
    expect(costValueUndefined).toBeDefined();
    expect(costValueUndefined.id).toBe("class_id");
    expect(costValueUndefined.classList[0]).toBe("class_id");
    expect(costValueUndefined.textContent).toBe("Not Available: class_id");
    const costNA = costData();
    expect(costNA).toBeDefined();
    expect(costNA).toBe("costData failed");
  });


  it('Check data', () => { // test for data function
    const getData = data(createElement, "value", "string");
    expect(getData).toBeDefined();
    expect(getData.id).toBe("string");
    expect(getData.classList[0]).toBe("string");
    expect(getData.textContent).toBe("value");

    const getDataNA = data(createElement, undefined, "string");
    expect(getDataNA).toBeDefined();
    expect(getDataNA.id).toBe("string");
    expect(getDataNA.classList[0]).toBe("string");
    expect(getDataNA.textContent).toBe("Not Available: string");
  });

  it('Check showParkingDetails', () => { // test for showParkingDetails function
    const parkingDetails = showParkingDetails(global.window.google.maps.places, parkingDetail);
    expect(parkingDetails).toBeDefined();
    expect(parkingDetails).toBe("showParkingDetails worked");
  });

  it('Check ParkingInfo', () => { // test for ParkingInfoParkingInfo function
    const info = ParkingInfo(global.window.google.maps.places, createElement);
    expect(info).toBeDefined();
    expect(info).toBe("ParkingInfo");
  });

  it('Check ParkingOpeningHour', () => { // test for ParkingOpeningHour function
    const openingHour = ParkingOpeningHour(global.window.google.maps.places, createElement);
    expect(openingHour).toBeDefined();
    expect(openingHour).toBe("ParkingOpeningHour OK");

    const openingHourNA = ParkingOpeningHour();
    expect(openingHourNA).toBeDefined();
    expect(openingHourNA).toBe("ParkingOpeningHour Failed");
  });

  it('Check parkingCost', () => { // test for parkingCost function
    const cost = parkingCost(global.window.google.maps.places, parkingDetail,createElement);
    expect(cost).toBeDefined();
    expect(cost).toBe("parkingCost");
  });

  it('Check createForm', () => { // test for createForm function
    const form = createForm(createElement, "classHere", "idHere", "action");
    expect(form).toBeDefined();
    expect(form.classList[0]).toBe("classHere");
    expect(form.id).toBe("idHere");
    expect(form.action).toBe("http://localhost/action");

    const formNA = createForm();
    expect(formNA).toBeDefined();
    expect(formNA).toBe("createForm didnt work");
  });

  it('Check createSection', () => { // test for createSection function
    const section = createSection(createElement, "div", "classHere", "idHere", "textContent");
    expect(section).toBeDefined();
    expect(section.classList[0]).toBe("classHere");
    expect(section.id).toBe("idHere");
    expect(section.textContent).toBe("textContent");

    const sectionNA = createSection();
    expect(sectionNA).toBeDefined();
    expect(sectionNA).toBe("createSection didnt work");
  });

  it('Check createMap', async () => { // test for createMap function
    const create = createMap(parkingDetail);
    expect(create).toBeDefined();
  });

  it('Check loadParkingDetail', async () => { // test for loadParkingDetail function
    const load = loadParkingDetail();
    expect(load).toBeDefined();
  });

  it('Check getParkingDetail_Id', () => { // test for getParkingDetail_Id function
    const id = getParkingDetail_Id();
    expect(id).toBeDefined();
    expect(id).toBe("ChIJ0XjfNHRddEgRQtXe1fjPW8w");
  });
})

const setupGoogleMock = () => {// Mock Google Maps JavaScript API
  const google = {
    maps: {
      places: {
        AutocompleteService: () => {},
        opening_hours: {
          weekday_text:["Monday: 8:00 AM – 6:30 PM", "Tuesday: 8:00 AM – 6:30 PM", "Wednesday: 8:00 AM – 6:30 PM", "Thursday: 8:00 AM – 6:30 PM", "Friday: 8:00 AM – 6:30 PM", "Saturday: 8:00 AM – 6:30 PM", "Sunday: 10:00 AM – 4:30 PM"],
        },
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },
      Geocoder: () => {},
      GeocoderStatus: {
        ERROR: 'ERROR',
        INVALID_REQUEST: 'INVALID_REQUEST',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
    },
  };
  global.window.google = google;
};

beforeAll(() => {// load function before start test
  setupGoogleMock();
});

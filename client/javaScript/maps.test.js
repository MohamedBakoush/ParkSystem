'use strict'

const {
  loadLatLonDetail, costData, dataParkingPhoto,
  dataParking, checkGooglePhoto, fetchParkingInfo,
  loadParkingDetail, checkLatLon, createMarker,
  callback, createMap
} = require('./maps'); // import functions from maps

const {findParkingDetail} = require('../../parkingInfoBoard'); // import findParkingDetail functions from parkingInfoBoard
global.window = Object.create(window);  // create a window
const url = "http://localhost:8080/maps?l=Stockholm%2C+Sweden&lat=59.32932349999999&lon=18.0685808"; // set url with maps (url that would be seen when load maps.html) url
Object.defineProperty(window, 'location', {
  value: {
    href: url // url that these test will use
  }
});


describe('maps', function () {
  const createElement = document.createElement("section");
  const parkingDetail = findParkingDetail("ChIJ0XjfNHRddEgRQtXe1fjPW8w");

  it('check fetchParkingInfo', () => {
    const parkingInfo = fetchParkingInfo(global.window.google.maps.places, parkingDetail);
    expect(parkingInfo).toBeDefined();
    expect(parkingInfo).toBe("fetchParkingInfo");
  });

  it('check createMarker', async () => {
    const marker = createMarker();
    expect(marker).toBeDefined();
  });

  it('check createMap', async () => { // test for createMap function
    const map = createMap();
    expect(map).toBeDefined();
  });

  it('check callback', () => { // test for callback function
    const call = callback();
    expect(call).toBeDefined();
  });

  it('check checkLatLon', () => { // test for checkLatLon function
    const latLon = checkLatLon(69,43);
    expect(latLon).toBeDefined();
    expect(latLon.lat).toBe(69);
    expect(latLon.lng).toBe(43);

    const latLonNA = checkLatLon();
    expect(latLonNA).toBeDefined();
    expect(latLonNA.lat).toBe(50.7952);
    expect(latLonNA.lng).toBe(-1.0872);
  });

  it('check loadParkingDetail', async () => {  // test for loadParkingDetail function
    const loadDetail = loadParkingDetail(global.window.google.maps.places);
    expect(loadDetail).toBeDefined();
  });


  it('check checkGooglePhoto', () => { // test for checkGooglePhoto function
    const googlePhoto = checkGooglePhoto()
    expect(googlePhoto).toBeDefined();
    expect(googlePhoto).toBe("pictures/noParkingImgFound.png");
  });


  it('check dataParking', () => { // test for dataParking function
    const parking = dataParking(createElement, "div", "idHere", "classHere", "href", "textContent")
    expect(parking).toBeDefined();
    expect(parking.id).toBe("idHere");
    expect(parking.classList[0]).toBe("classHere");
    expect(parking.textContent).toBe("textContent");
    expect(parking.href).toBe("href");

    const parkingNA = dataParking();
    expect(parkingNA).toBeDefined();
    expect(parkingNA).toBe("dataParking failed");
  });

  it('check dataParkingPhoto', () => { // test for dataParkingPhoto function
    const parkingPhoto = dataParkingPhoto(createElement, "div", "idHere", "claseHere", "100", "100", "src");
    expect(parkingPhoto).toBeDefined();
    expect(parkingPhoto.id).toBe("idHere");
    expect(parkingPhoto.classList[0]).toBe("claseHere");
    expect(parkingPhoto.src).toBe("src");
    expect(parkingPhoto.height).toBe("100");
    expect(parkingPhoto.width).toBe("100");

    const parkingPhotoNA = dataParkingPhoto()
    expect(parkingPhotoNA).toBeDefined();
    expect(parkingPhotoNA).toBe("dataParkingPhoto failed");
  });

  it('check costData', () => { // test for costData function
    const cost = costData(createElement, "div", "idHere", "claseHere", "$", 5);
    expect(cost).toBeDefined();
    expect(cost.id).toBe("idHere");
    expect(cost.classList[0]).toBe("claseHere");
    expect(cost.textContent).toBe("$ 5.00");

    const costNoValue = costData(createElement, "div", "idHere", "claseHere");
    expect(costNoValue).toBeDefined();
    expect(costNoValue.id).toBe("idHere");
    expect(costNoValue.classList[0]).toBe("claseHere");
    expect(costNoValue.textContent).toBe("Cost Not Available");

    const costNA = costData();
    expect(costNA).toBeDefined();
    expect(costNA).toBe("costData failed");
  });

  it('check loadLatLonDetail', () => { // test for loadLatLonDetail function
    const latLonDetail = loadLatLonDetail();
    expect(latLonDetail).toBeDefined();
    expect(latLonDetail.latitude).toBe("59.32932349999999");
    expect(latLonDetail.longitude).toBe("18.0685808");
  });
})

const setupGoogleMock = () => { // Mock Google Maps JavaScript API
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

beforeAll(() => { // load function before start test
  setupGoogleMock();
});

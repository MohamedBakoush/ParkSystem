'use strict'

const { loadLatLonDetail, costData, dataParkingPhoto, dataParking, fetchParkingInfo, loadParkingDetail, createMarker, callback, createMap} = require('./maps');
global.window = Object.create(window);
const url = "http://localhost:8080/maps?l=Stockholm%2C+Sweden&lat=59.32932349999999&lon=18.0685808";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});

// TODO: createMap, callback, createMarker, loadParkingDetail, fetchParkingInfo

describe('maps', function () {

    it('Get latitude longitude from herf', () => {
      const latlon = loadLatLonDetail();
      const latitude = latlon[0];
      const longitude = latlon[1];
      expect(latitude).toBe("59.32932349999999");
      expect(longitude).toBe("18.0685808");
    });

    it('Get costData', () => {
      // this is to imitate the element that is beign passes in into the function
       const container = document.createElement('div');
       // if there is a value then
       const withValueInput = costData(container, "div", "idHere", "claseHere", "£", 5);
       expect(withValueInput).toBeDefined();
       expect(withValueInput.id).toBe("idHere");
       expect(withValueInput.classList[0]).toBe("claseHere");
       expect(withValueInput.textContent).toBe("£ 5.00");
       // if there is no value then
       const noValueInput = costData(container);
       expect(noValueInput).toBeDefined();
       expect(withValueInput.id).toBe("idHere", "div", "idHere", "claseHere");
       expect(withValueInput.classList[0]).toBe("claseHere");
       expect(noValueInput.textContent).toBe("Cost Not Available");
    });

    it('Get dataParkingPhoto', () => {
      // this is to imitate the element that is beign passes in into the function
      const container = document.createElement('picture');

      const noGooglePic = dataParkingPhoto(container, 'img', "ParkingPictureImg", "ParkingPictureImg", "100", "100", "pictures/noParkingImgFound.png")
      expect(noGooglePic).toBeDefined();
      expect(noGooglePic.id).toBe("ParkingPictureImg");
      expect(noGooglePic.classList[0]).toBe("ParkingPictureImg");
      expect(noGooglePic.height).toBe(100);
      expect(noGooglePic.width).toBe(100);
      expect(noGooglePic.src).toBe("http://localhost/pictures/noParkingImgFound.png");

      const googlePic = dataParkingPhoto(container, 'img', "ParkingPictureImg", "ParkingPictureImg", "100", "100", google.maps.places.photos)
      expect(googlePic).toBeDefined();
      expect(googlePic.id).toBe("ParkingPictureImg");
      expect(googlePic.classList[0]).toBe("ParkingPictureImg");
      expect(googlePic.height).toBe(100);
      expect(googlePic.width).toBe(100);
      //undefined becouse i havent stated what maps.places.photos means below
      expect(googlePic.src).toBe("http://localhost/googlePicture.png");
    });

    it('Get dataParking', () => {
      // this is to imitate the element that is beign passes in into the function
      const container = document.createElement('div');
      const parkingData = dataParking(container,"div", 'ParkingInfoName', 'ParkingInfoName', "parkingDataTextContent");
      expect(parkingData).toBeDefined();
      expect(parkingData.id).toBe("ParkingInfoName");
      expect(parkingData.classList[0]).toBe("ParkingInfoName");
      expect(parkingData.textContent).toBe("parkingDataTextContent");
    });

})

const setupGoogleMock = () => {
  /*** Mock Google Maps JavaScript API ***/
  const google = {
    maps: {
      places: {
        AutocompleteService: () => {},
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
        photos: ["googlePicture.png"],
        place_id: ["id"]
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


// in test file.
beforeAll(() => {
  setupGoogleMock();
});

const { loadLatLonDetail, costData, dataParkingPhoto} = require('./maps');
global.window = Object.create(window);
const url = "http://localhost:8080/maps?l=Stockholm%2C+Sweden&lat=59.32932349999999&lon=18.0685808";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});

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
       expect(withValueInput).toBe("Cost Available");
       // if there is no value then
       const noValueInput = costData(container);
       expect(noValueInput).toBeDefined();
       expect(noValueInput).toBe("Cost Not Available");
    });

    it('Get dataParkingPhoto', () => {
      // this is to imitate the element that is beign passes in into the function
      const container = document.createElement('picture');
       // if there is a value then
      const googlePic = dataParkingPhoto(container, 'img', "ParkingPictureImg", "ParkingPictureImg", "100", "100", google.maps.places.photos[0])
      expect(googlePic).toBeDefined();
      expect(typeof googlePic).toBe('object');
      expect(googlePic).toBe(google.maps.places.photos[0]); 
      // if there is no value then
      const noGooglePic = dataParkingPhoto(container, 'img', "ParkingPictureImg", "ParkingPictureImg", "100", "100", "pictures/noParkingImgFound.png");
       expect(noGooglePic).toBeDefined();
       expect(noGooglePic).toBe("pictures/noParkingImgFound.png");
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
        photos: [
        { INVALID_REQUEST: 'INVALID_REQUEST' }
      ]
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

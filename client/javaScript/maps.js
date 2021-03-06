'use strict';

let map;

async function createMap() {  // create google maps
  const google = window.google;
  const latlon = loadLatLonDetail(); // get latitude, longitude Details
  const location = checkLatLon(latlon.latitude, latlon.longitude); // give location latitude, longitude
  map = new google.maps.Map(document.getElementById('map'), { //create new google maps
    center: location, // destination location where google map will open at
    zoom: 15, // zoom level of map
    mapTypeId: "roadmap" // map type
  });
  let requestParkingSpaces = { // to requrest only parking and the radius it covers
    location: map.getCenter(), // destination location where google map will show parking lcoations
    radius: 8000, // radious parking locations cover
    types: ['parking'] // request only parking
  }
  let service = new google.maps.places.PlacesService(map);
  service.nearbySearch(requestParkingSpaces, callback);
}

function callback(results, status) { // if staus is ok callback takes each available parking space in area and puts them into specified functions
  const google = window.google;
  if (status == google.maps.places.PlacesServiceStatus.OK) { // if google.maps.places works
    for (var i = 0; i < results.length; i++) { // takes all places (parking spaces) available and puts into each function
      createMarker(results[i]); // give places to createMarker
      loadParkingDetail(results[i]); // give places to loadParkingDetail
    }
    return "PlacesServiceStatus OK"; // return all good
  } else { // return fail
    return "PlacesServiceStatus Not OK";
  }
}

async function createMarker(place) { // creats a marker on google map
  const google = window.google;
  let marker = new google.maps.Marker({  // creats a marker
    map: map,
    position: place.geometry.location,
    title: place.name,
    label: "P",
  });

  const contentString = '<div> <strong>' + place.name + '</strong><br>' +   // content string which will be inputed into infowindow in google maps
    'Place ID: ' + place.place_id + '<br>' +
    'vicinity : ' + place.vicinity + '<br>' +
    'Rateing : ' + place.rating + '<br>' +
    `<a href='parkingInfo#${place.place_id}'> Place Information </a>`;

  const infowindow = new google.maps.InfoWindow({ // put contentString into InfoWindow of marker
    content: contentString
  });

  google.maps.event.addListener(marker, 'click', function() {   // opens infowindow when click on marker
    infowindow.open(map, marker);
  });
}

function checkLatLon(latitude, longitude) { // check if latitude and longitude is number
  let location;
  if(Number(latitude) && Number(longitude) ){ // if latitude and longitude are numbers assign to location lat and lon
    location = {
      lat: Number(latitude),
      lng: Number(longitude)
    };
  } else{ // if latitude and longitude are not numbers give preDefined location lat and lon
    location = {
      lat: 50.7952,
      lng: -1.0872
    };
  }
  return location; // return location
}

async function loadParkingDetail(place) {  // load parking details
  const id = place.place_id; // assign id from place.place_id
  const response = await fetch(`parkingDetails/${id}`);  // fetch parkingDetails with provided id
  let parkingDetail;
  if (response.ok) { // if response is ok assign parkingDetail with data from database
    parkingDetail = await response.json();
  } else { // if respons fails assign parkingDetail with error message
    parkingDetail = { msg: 'failed to load messages' };
  }
  fetchParkingInfo(place, parkingDetail) // give fetchParkingInfo place and parkingDetail
}

function fetchParkingInfo(place, parkingDetail) { // fetches parking information and puts into mapListContainer element
  const mapListContainer = document.getElementById('mapListContainer'); // get mapListContainer id from maps.html
  const ParkingInfoLink = dataParking(mapListContainer, "a", "ParkingInfoLink", "ParkingInfoLink", `parkingInfo#${place.place_id}`); // uniq herf link with place id for refrence
  const ParkingInfo = dataParking(ParkingInfoLink, "div", "ParkingInfo", "ParkingInfo"); // create div
  const ParkingPictureContainer = dataParking(ParkingInfo, "picture", "ParkingPictureContainer", "ParkingPictureContainer");// create picture container
  const photo = checkGooglePhoto(place.photos);   // check if place.photo is undefined or not
  dataParkingPhoto(ParkingPictureContainer, 'img', "ParkingPictureImg", "ParkingPictureImg", "100", "100",  photo);
  const ParkingInfoContainerInfo = dataParking(ParkingInfo, "div", "ParkingInfoContainerInfo", "ParkingInfoContainerInfo");
  dataParking(ParkingInfoContainerInfo, "div", "ParkingInfoName", "ParkingInfoName", "", place.name ) // name of parking space inside in ParkingInfoContainerInfo
  dataParking(ParkingInfoContainerInfo, "div", "ParkingInfoAddress", "ParkingInfoAddress", "", place.vicinity )   // vicinity of parking space inside in ParkingInfoContainerInfo
  const ParkingInfoContainerCost = dataParking(ParkingInfo, "div", "ParkingInfoContainerCost", "ParkingInfoContainerCost");  // Parking Info Cost Container Containg parking cost
  costData(ParkingInfoContainerCost, "div", 'ParkingInfoCost', 'ParkingInfoCost', '1 Hour: £', parkingDetail.cost1Hour);   // fill ParkingInfoContainerCost with cost data
  return "fetchParkingInfo"; // return fetchParkingInfo
}

function checkGooglePhoto(photo) {
  try { // if photo is exist
    const checkPhoto = photo[0].getUrl({maxWidth: 1000, maxHeight: 1250 });  // assign url, width and hight quallity to checkPhoto
    return checkPhoto; // return checkPhoto
  } catch (e) {  // if photo is undefined
    const checkPhoto = "pictures/noParkingImgFound.png";  // assign img to checkPhoto
    return checkPhoto;  // return checkPhoto
  }
}

function dataParking(container, elementType, idHere, classHere, href, textContent ) {
  try {  // if inputs are valid
    const ParkingInfo = document.createElement(elementType); // create element
    ParkingInfo.id = idHere; // assign id
    ParkingInfo.classList = classHere;  // assign class
    ParkingInfo.textContent = textContent; // assign textContent
    ParkingInfo.href = href;  // assign href
    container.appendChild(ParkingInfo); // append ParkingInfo in container
    return ParkingInfo; //return ParkingInfo
  } catch (e) { // return fail
    return "dataParking failed";
  }
}

function dataParkingPhoto(container, type, idHere, claseHere, height, width, src){
  try {  // if inputs are valid
    const ParkingPictureImg = document.createElement(type); // create element
    ParkingPictureImg.id = idHere; // assign id
    ParkingPictureImg.classList = claseHere; // assign class
    ParkingPictureImg.src = src; // assign src
    ParkingPictureImg.height = height;  // assign height
    ParkingPictureImg.width = width; // assign width
    container.appendChild(ParkingPictureImg); // append ParkingPictureImg in container
    return ParkingPictureImg; //return ParkingPictureImg
  } catch (e) { // return fail
    return "dataParkingPhoto failed";
  }
}

function costData(container, type, idHere, claseHere, moneySign, value){
  try {  // if inputs are valid
    const costData = document.createElement(type); // create element
    if(value != undefined){ // if value is undefined
      costData.id = idHere; // assign id
      costData.classList = claseHere; // assign class
      costData.textContent =  `${moneySign} ${value.toFixed(2)}`; // assign textContent
      container.appendChild(costData); // append costData in container
      return costData; // return costData
    } else { // if value is defiend
      costData.id = idHere; // assign id
      costData.classList = claseHere; // assign class
      costData.textContent = `Cost Not Available`; // assign textContent
      container.appendChild(costData); // append costData in container
      return costData; // return costData
      }
  } catch (e) { // return fail
    return "costData failed";
  }
}

function loadLatLonDetail(){ // split up herf to get lat an lon
  const splitherf = window.location.href.split("lat=",2);
  const splitLatLon = splitherf[1].split("&lon=");
  const latitude = splitLatLon[0];
  const longitude = splitLatLon[1];
  return {latitude, longitude}; // return latitude, longitude
}

function pageLoaded() { // all the functions that are to load when the page loads
  createMap();
}

window.addEventListener('load', pageLoaded); // load pageLoaded when html page loads

module.exports = { // export modules
  loadLatLonDetail,
  costData,
  dataParkingPhoto,
  dataParking,
  checkGooglePhoto,
  fetchParkingInfo,
  loadParkingDetail,
  checkLatLon,
  createMarker,
  callback,
  createMap,
};

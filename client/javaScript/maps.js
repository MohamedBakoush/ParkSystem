'use strict';
let map;

async function createMap() {  // create google maps
  const google = window.google;
  const latlon = loadLatLonDetail();
  const location = checkLatLon(latlon.latitude, latlon.longitude);
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15,
    mapTypeId: "roadmap"
  });
  // to requrest only parking sapce and the radius it covers
  let requestParkingSpaces = {
    location: map.getCenter(),
    radius: 8000,
    types: ['parking']
  }
  let service = new google.maps.places.PlacesService(map);
  service.nearbySearch(requestParkingSpaces, callback);
}
function callback(results, status) { // if staus is ok callback takes each available parking space in area and puts them into specified functions
  const google = window.google;
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) { // takes all places (parking spaces) available and puts into each function
      createMarker(results[i]);
      loadParkingDetail(results[i]);
    }
    console.log("PlacesServiceStatus OK");
  } else {
    console.log("PlacesServiceStatus Not OK");
  }
}

function createMarker(place) { // creats a marker on google map
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

  let infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  google.maps.event.addListener(marker, 'click', function() {   // opens infowindow when click on marker
    infowindow.open(map, marker);
  });
}

function checkLatLon(latitude, longitude) {
  let location;
  if(Number(latitude) && Number(longitude) ){
    location = {
      lat: Number(latitude),
      lng: Number(longitude)
    };
  } else{
    location = {
      lat: 50.7952,
      lng: -1.0872
    };
  }
  return location;
}

async function loadParkingDetail(place) {
  const id = place.place_id;
  const response = await fetch(`parkingDetails/${id}`);
  let parkingDetail;
  if (response.ok) {
    parkingDetail = await response.json();
  } else {
    parkingDetail = { msg: 'failed to load messages' };
  }
  // puts place and parkingDetail in fetchParkingInfo
  fetchParkingInfo(place, parkingDetail);
}

// fetches parking information and puts into mapListContainer element
function fetchParkingInfo(place, parkingDetail) {
  const mapListContainer = document.getElementById('mapListContainer');
  const ParkingInfoLink = dataParking(mapListContainer, "a", "ParkingInfoLink", "ParkingInfoLink", `parkingInfo#${place.place_id}`);
  // creates a div in mapListContainer which is already defined in html code
  const ParkingInfo = dataParking(ParkingInfoLink, "div", "ParkingInfo", "ParkingInfo");
  // create picture element
  const ParkingPictureContainer = dataParking(ParkingInfo, "picture", "ParkingPictureContainer", "ParkingPictureContainer");
  // if there are available pictures from google places api
  checkGooglePhoto(place.photos, ParkingPictureContainer, 'img', "ParkingPictureImg", "ParkingPictureImg", "100", "100" );

  const ParkingInfoContainerInfo = dataParking(ParkingInfo, "div", "ParkingInfoContainerInfo", "ParkingInfoContainerInfo");

  // name of parking space inside in ParkingInfoContainerInfo
  dataParking(ParkingInfoContainerInfo, "div", "ParkingInfoName", "ParkingInfoName", "", place.name )
  // Address of parking space inside in ParkingInfoContainerInfo
  dataParking(ParkingInfoContainerInfo, "div", "ParkingInfoAddress", "ParkingInfoAddress", "", place.vicinity )

  // Parking Info Cost Container Containg parking cost
  const ParkingInfoContainerCost = dataParking(ParkingInfo, "div", "ParkingInfoContainerCost", "ParkingInfoContainerCost");
  // fill ParkingInfoContainerCost with cost data
  costData(ParkingInfoContainerCost, "div", 'ParkingInfoCost', 'ParkingInfoCost', '1 Hour: £', parkingDetail.cost1Hour);
}

function checkGooglePhoto(photo, container, elementType, idHere, classHere, height, width) {
  if(photo != null){ // if size dosent show img try 32 insted
    dataParkingPhoto(container, elementType, idHere, classHere, height, width, photo[0].getUrl({maxWidth: 32, maxHeight: 32}));
    return "Google Photo Exists";
  } else{ // if there is no pictures from google places api noParkingImgFound.png will show insted
    dataParkingPhoto(container, elementType, idHere, classHere, height, width, "pictures/noParkingImgFound.png");
    return "Google Photo null";
  }
}

function dataParking(container, elementType, idHere, classHere, href, textContent ) {
  let ParkingInfo = document.createElement(elementType);
  ParkingInfo.id = idHere;
  ParkingInfo.classList = classHere;
  ParkingInfo.textContent = textContent;
  ParkingInfo.href = href;
  container.appendChild(ParkingInfo);
  return ParkingInfo;
}

function dataParkingPhoto(container, type, idHere, claseHere, height, width, src){
  let ParkingPictureImg = document.createElement(type);
  ParkingPictureImg.id = idHere;
  ParkingPictureImg.classList = claseHere;
  ParkingPictureImg.src = src;
  ParkingPictureImg.height = height;
  ParkingPictureImg.width = width;
  container.appendChild(ParkingPictureImg);
  return ParkingPictureImg;
}
function costData(container, type, idHere, claseHere, moneySign, value){
  const costData = document.createElement(type);
  if(value != undefined){
    costData.id = idHere;
    costData.classList = claseHere;
    costData.textContent =  `${moneySign} ${value.toFixed(2)}`;
    container.appendChild(costData);
    return costData;
  } else {
    costData.id = idHere;
    costData.classList = claseHere;
    costData.textContent = `Cost Not Available`;
    container.appendChild(costData);
    return costData;
    }
}

function loadLatLonDetail(){
  // split up herf to get lat an lon
  const splitherf = window.location.href.split("lat=",2);
  const splitLatLon = splitherf[1].split("&lon=");
  const latitude = splitLatLon[0];
  const longitude = splitLatLon[1];
  return {latitude, longitude};
}

function pageLoaded() {
}

window.addEventListener('load', pageLoaded);


module.exports = {
  // export modules
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

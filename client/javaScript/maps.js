'use strict';
// TODO: add getDetails() to be able to import formatted_address, etc
// currently anywhere where formatted_address is seposed to be vicinity takes its place
// TODO: fix opening times to
let map;
 // create google maps
async function createMap() {

  const latitude =  loadLatLonDetail()[0];
  const longitude =  loadLatLonDetail()[1];
  let location;
  // check if lat and lon both are numbers, if yest then put corrdients
  // in location for later use
  // if not redirect to portsmouth (for testing purposes)
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

  // console.log(location);
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



// if staus is ok callback takes each available parking space in area and puts them into specified functions
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // takes all places (parking spaces) available and puts into each function
      createMarker(results[i]);
      loadParkingDetail(results[i]);
    }
    console.log("PlacesServiceStatus OK");
  } else {
    console.log("PlacesServiceStatus Not OK");
  }
}

// creats a marker on google map
function createMarker(place) {
  // creats a marker
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    label: "P",
  });
  // link to place ticket page
  const placeInfolink =  `parkingInfo#${place.place_id}`;
  // content string which will be inputed into infowindow in google maps
  const contentString = '<div> <strong>' + place.name + '</strong><br>' +
    'Place ID: ' + place.place_id + '<br>' +
    'vicinity : ' + place.vicinity + '<br>' +
    'Rateing : ' + place.rating + '<br>' +
    `<a href='${placeInfolink}'> Place Information </a>`;
  let infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  // opens infowindow when click on marker
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
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
  // herf link for each parking info box
  let ParkingInfoLink = document.createElement('a');
  ParkingInfoLink.id = "ParkingInfoLink";
  ParkingInfoLink.classList = "ParkingInfoLink";
  ParkingInfoLink.href = `parkingInfo#${place.place_id}`;
  mapListContainer.appendChild(ParkingInfoLink);

  // creates a div in mapListContainer which is already defined in html code
  let ParkingInfo = document.createElement('div');
  ParkingInfo.id = "ParkingInfo";
  ParkingInfo.classList = "ParkingInfo";
  ParkingInfoLink.appendChild(ParkingInfo);

  // create picture element
  let ParkingPictureContainer = document.createElement('picture');
  ParkingPictureContainer.id = "ParkingPictureContainer";
  ParkingPictureContainer.classList = "ParkingPictureContainer";
  ParkingInfo.appendChild(ParkingPictureContainer);

  //create img element
  let ParkingPictureImg = document.createElement('img');
  // if there are available pictures from google places api
  if(place.photos != null){ // if size dosent show img try 32 insted
    dataParkingPhoto(ParkingPictureContainer, 'img', "ParkingPictureImg", "ParkingPictureImg", "100", "100", place.photos[0].getUrl({maxWidth: 100, maxHeight: 100}))
  } else{ // if there is no pictures from google places api
    // noParkingImgFound.png will show insted
    dataParkingPhoto(ParkingPictureContainer, 'img', "ParkingPictureImg", "ParkingPictureImg", "100", "100", "pictures/noParkingImgFound.png")
  }

  // Parking Info Container for containg parking Information
  let ParkingInfoContainerInfo = document.createElement('div');
  ParkingInfoContainerInfo.id = 'ParkingInfoContainerInfo';
  ParkingInfoContainerInfo.classList = 'ParkingInfoContainerInfo';
  ParkingInfo.appendChild(ParkingInfoContainerInfo);

  // name of parking space inside in ParkingInfoContainerInfo
  dataParking(ParkingInfoContainerInfo,"div", 'ParkingInfoName', 'ParkingInfoName', `${place.name}`);
  // Address of parking space inside in ParkingInfoContainerInfo
  dataParking(ParkingInfoContainerInfo,"div", 'ParkingInfoAddress', 'ParkingInfoAddress', `${place.vicinity}`);

  // Parking Info Cost Container Containg parking cost
  let ParkingInfoContainerCost = document.createElement('div');
  ParkingInfoContainerCost.id = 'ParkingInfoContainerCost';
  ParkingInfoContainerCost.classList = 'ParkingInfoContainerCost';
  ParkingInfo.appendChild(ParkingInfoContainerCost);
  // fill ParkingInfoContainerCost with cost data
  costData(ParkingInfoContainerCost, "div", 'ParkingInfoCost', 'ParkingInfoCost', '£', parkingDetail.cost1Hour);
}

function dataParking(container, type, idHere, claseHere, textContent){
  let ParkingData = document.createElement(type);
  ParkingData.id = idHere;
  ParkingData.classList = claseHere;
  ParkingData.textContent = textContent;
  container.appendChild(ParkingData);
  return ParkingData;
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
    };
}

function loadLatLonDetail(){
  // split up herf to get lat an lon
  const splitherf = window.location.href.split("lat=",2);
  const splitLatLon = splitherf[1].split("&lon=");
  const latitude = splitLatLon[0];
  const longitude = splitLatLon[1];
  return [latitude, longitude];
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
  fetchParkingInfo,
  loadParkingDetail,
  createMarker,
  callback,
  createMap,
};

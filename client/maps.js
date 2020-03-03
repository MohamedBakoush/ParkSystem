'use strict';
// TODO: add getDetails() to be able to import formatted_address, etc
// currently anywhere where formatted_address is seposed to be vicinity takes its place
// TODO: fix opening times to
let map;


 // create google maps
async function createMap() {
  // get the lan and lon from index search page
  // if value data dosent exist thenn show location
  const response = await fetch(`LatLonDetails`);
  let LatLong;
  if (response.ok) {
    LatLong = await response.json();
  } else {
    LatLong = { msg: 'failed to load messages' };
  }
  const latlng = LatLong[0];

  // if latlng is not a number
  // show defult location which is portsmouth
  let location;
  if(Number.isFinite(latlng.Latitude)){
    location = {
      lat: latlng.Latitude,
      lng: latlng.Longitude
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
      fetchParkingInfo(results[i]);
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

// fetches parking information and puts into mapListContainer element
function fetchParkingInfo(place) {

  const mapListContainer = document.getElementById('mapListContainer');
  // herf link for each parking info box
  let ParkingInfoLink = document.createElement('a');
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
  ParkingPictureImg.id = "ParkingPictureImg";
  ParkingPictureImg.classList = "ParkingPictureImg";
  // if there are available pictures from google places api
  if(place.photos != null){ // if size dosent show img try 32 insted
    ParkingPictureImg.src = place.photos[0].getUrl({maxWidth: 100, maxHeight: 100});
    ParkingPictureContainer.appendChild(ParkingPictureImg);
  } else{ // if there is no pictures from google places api
    // noParkingImgFound.png will show insted
    ParkingPictureImg.src = "pictures/noParkingImgFound.png";
    ParkingPictureImg.height = "100";
    ParkingPictureImg.width = "100";
    ParkingPictureContainer.appendChild(ParkingPictureImg);
  }

  // Parking Info Container for containg parking Information
  let ParkingInfoContainerInfo = document.createElement('div');
  ParkingInfoContainerInfo.id = 'ParkingInfoContainerInfo';
  ParkingInfoContainerInfo.classList = 'ParkingInfoContainerInfo';
  ParkingInfo.appendChild(ParkingInfoContainerInfo);

  // name of parking space inside in ParkingInfoContainerInfo
  let ParkingInfoName = document.createElement('div');
  ParkingInfoName.id = 'ParkingInfoName';
  ParkingInfoName.classList = 'ParkingInfoName';
  ParkingInfoName.textContent = `${place.name}`;
  ParkingInfoContainerInfo.appendChild(ParkingInfoName);

  // Address of parking space inside in ParkingInfoContainerInfo
  let ParkingInfoAddress = document.createElement('div');
  ParkingInfoAddress.id = 'ParkingInfoAddress';
  ParkingInfoAddress.classList = 'ParkingInfoAddress';
  ParkingInfoAddress.textContent = `${place.vicinity}`;
  //vicinity  is simplifed formatted_address
  ParkingInfoContainerInfo.appendChild(ParkingInfoAddress);

  // Parking Info Cost Container Containg parking cost
  let ParkingInfoContainerCost = document.createElement('div');
  ParkingInfoContainerCost.id = 'ParkingInfoContainerCost';
  ParkingInfoContainerCost.classList = 'ParkingInfoContainerCost';
  ParkingInfo.appendChild(ParkingInfoContainerCost);

  // Cost of parking space inside in ParkingInfoContainerCost
  let ParkingInfoCost = document.createElement('div');
  ParkingInfoCost.id = 'ParkingInfoCost';
  ParkingInfoCost.classList = 'ParkingInfoCost';
  ParkingInfoCost.textContent = 'ParkingInfoCost';
  ParkingInfoContainerCost.appendChild(ParkingInfoCost);
}

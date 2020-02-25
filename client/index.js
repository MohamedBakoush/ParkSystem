let map;
// create google maps
function createMap() {
  let location = {
    lat: 50.7952,
    lng: -1.0872
  };
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
    url: place.id,
    label: "P",
  });
  // link to place ticket page
  const placeInfolink = window.location.href + "/place=" + place.place_id;
  // content string which will be inputed into infowindow in google maps
  const contentString = '<div> <strong>' + place.name + '</strong><br>' +
    'Place ID: ' + place.place_id + '<br>' +
    'Address : ' + place.vicinity + '<br>' +
    'Opening Hours : ' + place.opening_hours + '<br>' +
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

  // creates a div in mapListContainer which is already defined in html code
  let ParkingInfo = document.createElement('div');
  ParkingInfo.id = "ParkingInfo";
  ParkingInfo.classList = "ParkingInfo";
  mapListContainer.appendChild(ParkingInfo);

  // Parking Info Container for containg parking Information
  let ParkingInfoContainerInfo = document.createElement('div');
  ParkingInfoContainerInfo.id = 'ParkingInfoContainerInfo';
  ParkingInfoContainerInfo.classList = 'ParkingInfoContainerInfo';
  ParkingInfo.appendChild(ParkingInfoContainerInfo);

  // name of parking space inside in ParkingInfoContainerInfo
  let ParkingInfoName = document.createElement('div');
  ParkingInfoName.id = 'ParkingInfoName';
  ParkingInfoName.classList = 'ParkingInfoName';
  ParkingInfoName.textContent = place.name;
  ParkingInfoContainerInfo.appendChild(ParkingInfoName);

  // Address of parking space inside in ParkingInfoContainerInfo
  let ParkingInfoAddress = document.createElement('div');
  ParkingInfoAddress.id = 'ParkingInfoAddress';
  ParkingInfoAddress.classList = 'ParkingInfoAddress';
  ParkingInfoAddress.textContent = place.vicinity;
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

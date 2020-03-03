'use strict';


// auto complete search of a given google palce api
// puts the values into
function AutoSearch(){
  const searchInput = 'serch_input';
  const autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
    types: ['geocode']
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function (){
    var near_place = autocomplete.getPlace();
    // TODO: could prob deleted this section check if value is needed before doing anything
    const latitude_input = document.getElementById('latitude_input');
    const longitude_input = document.getElementById('longitude_input');
    // get latitude and longitude from search input
    latitude_input.value = near_place.geometry.location.lat();
    longitude_input.value = near_place.geometry.location.lng();
   // send to database
    sendLatLogDetails(near_place.geometry.location.lat(), near_place.geometry.location.lng());
  });

};

// puts latitude, latitude from sendLatLogDetails into LatLonDetails database
// inputed value replaces existing value in database
async function sendLatLogDetails(latitude, longitude){

    const payload = {
      Latitude: latitude,
      Longitude : longitude,
    };
    const response = await fetch('LatLonDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      console.log('send parking details to database worked');
    } else {
      console.log('failed to send parking details to database', response);
    }
}


// for testing purposes

function  portsmouth(){
  sendLatLogDetails(50.7952, -1.0872);
}
function  london(){
  sendLatLogDetails(51.5074, -0.1195);
}
function  southampton(){
  sendLatLogDetails(50.9097, -1.4043);
}

function pageLoaded() {
  AutoSearch();
}

window.addEventListener('load', pageLoaded);

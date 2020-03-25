'use strict';

async function autoSearch(){ // autoSearch gets lattitue/longitude from google api and puts them into latitude_input.value/longitude_input.value
  const google = window.google; // assaign window.google to goole
  const searchInput = 'serch_input'; // asaign serch_input to searchInput
  const autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
    types: ['geocode'] // types of requests the system requests from google api
  });
  google.maps.event.addListener(autocomplete, 'place_changed', function (){
    const near_place = autocomplete.getPlace(); // assaign near_place to autocomplete.getPlace()
    document.getElementById("latitude_input").value = near_place.geometry.location.lat(); // give lattitue to latitude_input value from google api
    document.getElementById("longitude_input").value = near_place.geometry.location.lng(); // give longitude to longitude_input value from google api
  });
}

window.addEventListener('load', autoSearch); // load autoSearch when html page loads

module.exports = { // export modules
  autoSearch
};

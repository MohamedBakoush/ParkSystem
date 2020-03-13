'use strict';

function AutoSearch(){
  const google = window.google;
  const searchInput = 'serch_input';
  const autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
    types: ['geocode']
  });
  google.maps.event.addListener(autocomplete, 'place_changed', function (){
    const near_place = autocomplete.getPlace();
    document.getElementById("latitude_input").value = near_place.geometry.location.lat();
    document.getElementById("longitude_input").value = near_place.geometry.location.lng();
  });
}

function pageLoaded() {
  AutoSearch();
}

window.addEventListener('load', pageLoaded);

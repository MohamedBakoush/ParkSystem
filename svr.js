'use strict';
const express = require('express');
const app = express();
const pib = require('./parkingInfoBoard');

// adds html as extensions
// dont need to write index.html
// www.example.com/index will work if the file exists
app.use(express.static('client', { extensions: ['html'] }));

function getParkingDetails(request, response){
  //gets all Parking Details available
  response.json(pib.listParkingDetails());
}

function getParkingDetail(req, res){
  //get a specific parkingDetails by id
  const result = pib.findParkingDetail(req.params.id);
  console.log(req.params.id);
  if(!result){
    res.status(404).send('No match ID')
    return;
  }
  res.json(result);
}

function postParkingDetail(req, res) {
  // adds parking parkingDetail to the database
  // TODO: Fill out required data for parkingDetails
  const parkingDetails = pib.addParkingDetails(req.body.id, req.body.name, req.body.address, );
  res.json(parkingDetails);
}

app.get('/parkingDetails', getParkingDetails);
app.get('/parkingDetails/:id', getParkingDetail);
app.post('/parkingDetails', express.json(), postParkingDetail);

app.listen(8080);

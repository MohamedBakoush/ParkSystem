'use strict';
const express = require('express');
const app = express();
const pib = require('./parkingInfoBoard');
const uib = require('./userInfo');

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

// Creates an account using the form
function createAcc(req, res) {
  const body = req.body;
  const account = uib.addUser(body.username, body.password, body.forename, body.surname, body.email, body.phoneNum);
  res.json(account);
}

// Will log the user in
function login(req, res) {
  const result =  uib.logIn(req.body.username, req.body.password);
  res.send(result);
}

// Gets all the user information
async function getUserList(req, res) {
  res.json(uib.getAllUsers());
}

app.get('/parkingDetails', getParkingDetails);
app.get('/parkingDetails/:id', getParkingDetail);
app.post('/parkingDetails', express.json(), postParkingDetail);
app.post('/registerAcc', express.json(), createAcc);
app.get('/registerAcc', getUserList);
app.post('/loginAcc', express.json(), login);

app.listen(8080);

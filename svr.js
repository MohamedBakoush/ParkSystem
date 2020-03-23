'use strict';
const express = require('express');
const app = express();
const pib = require('./parkingInfoBoard');
const uib = require('./userInfo');

// adds html as extensions, dont need to write index.html
// www.example.com/index will work if the file exists
app.use(express.static('client', { extensions: ['html'] }));

//gets all Parking Details available
function getParkingDetails(request, response){
  response.json(pib.listParkingDetails());
}

//get a specific parkingDetails by id
function getParkingDetail(req, res){
  const result = pib.findParkingDetail(req.params.id);
  console.log(req.params.id);
  if(!result){
    res.status(404).send('No match ID')
    return;
  }
  res.json(result);
}

// Creates an account using the form
function createAcc(req, res) {
  const body = req.body;
  const account = uib.addUser(body.username, body.password, body.forename, body.surname, body.email, body.phoneNum);
  if (account == "userExist") {
    res.status(400).send({message: account});
  }else {
    res.json(account);
  }
}

// Will log the user in
function login(req, res) {
  const result =  uib.logIn(req.body.username, req.body.password);
  console.log("result: ", result);
  if (result == "usernameWrong") {
    res.status(400).send({message: result});
  } else if (result == "passwordWrong") {
    res.status(401).send({message: result});
  }
  else {
    res.send(result);
  }
}

// Will log the user in
function logout(req, res) {
  const result =  uib.logOut(req.body.username);
  console.log("result: ", result);
  if (result == "noUserFound") {
    res.status(400).send({message: result});
  } else {
    res.send(result);
  }
}

// Gets all the user information
async function getUserList(req, res) {
  res.json(uib.getAllUsers());
}

// Get Current login user
function getCurrentUser(request, response){
  response.json(uib.listCurrentUser());
}

// add Current User that is login in
function postCurrentUserDetail(req, res) {
  const currentUser = uib.addCurrentUser(req.body.username);
  res.json(currentUser);
}

app.get('/CurrentUser', getCurrentUser);
app.post('/CurrentUser', express.json(), postCurrentUserDetail);

app.get('/parkingDetails', getParkingDetails);
app.get('/parkingDetails/:id', getParkingDetail);

app.post('/registerAcc', express.json(), createAcc);
// app.get('/registerAcc', getUserList);

app.post('/loginAcc', express.json(), login);

app.post('/logOutAcc', express.json(), logout);

app.listen(8080);

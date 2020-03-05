'use strict';
/*Object to hold the commonly accessed elements*/
const elem = {};

/*Function which will set up handles on elements and event listeners when the page loads*/
async function pageLoaded() {
  prepareHandles();
  addEventListeners();
}

/*Function to grab handles on commonly accessed elements and store them in the elem object*/
async function prepareHandles() {
  elem.username = document.querySelector("#username");
  elem.password = document.querySelector("#password");
  elem.forename = document.querySelector("#forename");
  elem.surname = document.querySelector("#surname");
  elem.email = document.querySelector("#email");
  elem.phoneNum = document.querySelector("#phoneNum");
  elem.regBut = document.querySelector("#regBut");
}

/*Adds event listeners to the elements that need event listeners*/
async function addEventListeners() {
  elem.regBut.addEventListener('click', grabEverything);
}

// Creates an account if the username doesn't exist
async function createUserAccount(thing) {
  const payload = {
    username: thing.username,
    password: thing.password,
    forename: thing.forename,
    surname: thing.surname,
    email: thing.email,
    phoneNum: thing.phoneNum
  };

  console.log('Payload', payload);

  const response = await fetch('registerAcc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    console.log('user account created');
  } else {
    console.log('failed to create account', response);
  }
}

/*Gathers all of the values from the form and returns them inside an object*/
function grabEverything() {
  let accountInfo = {};
  accountInfo.username = elem.username.value;
  accountInfo.password = elem.password.value;
  accountInfo.forename = elem.forename.value;
  accountInfo.surname = elem.surname.value;
  accountInfo.email = elem.email.value;
  accountInfo.phoneNum = elem.phoneNum.value;
  createUserAccount(accountInfo);
}

/*Once page has loaded, will call function pageLoaded*/
window.addEventListener('load', pageLoaded);

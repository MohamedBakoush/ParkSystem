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

/*Sends the account information form to the server*/
async function registerAccount() {
  let accountInfo = grabEverything();
  const response = await fetch('/registerAcc', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(accountInfo),
  });

  if (response.ok) {
    console.log('account created with the following info: ', accountInfo);
  }
}

async function getAllUserInfoInJSON() {
  const response = await fetch('userInfoDetails');
  if (response.ok) {
    const userList = response.json();
  }
}


async function sendUserInfo(thing) {
  // the data that is being send to parkingDetails (database)

  //const thing = grabEverything();
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
    console.log('send parking details to database worked');
  } else {
    console.log('failed to send parking details to database', response);
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
  sendUserInfo(accountInfo);
}

/*Once page has loaded, will call function pageLoaded*/
window.addEventListener('load', pageLoaded);

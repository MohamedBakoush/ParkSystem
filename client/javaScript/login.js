'use strict';

const elem = {};

async function pageLoaded() {
  prepareHandles();
  addEventListeners();
}

async function prepareHandles() {
  elem.username = document.querySelector("#username");
  elem.password = document.querySelector("#password");
  elem.loginBut = document.querySelector("#loginBut")
}

async function addEventListeners() {
  elem.loginBut.addEventListener('click', grabEverything);
}

function grabEverything() {
  let loginInfo = {};
  loginInfo.username = elem.username.value;
  loginInfo.password = elem.password.value;
  checkLogin(loginInfo);
}

async function checkLogin(loginInfo) {
  const payload = {
    username: loginInfo.username,
    password: loginInfo.password
  };

  console.log('Payload', payload);

  const errorContainer = document.getElementById('errors');
  document.getElementById('errors').innerHTML = "";

  const response = await fetch('loginAcc', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    console.log("login worked");
    currentUser(loginInfo);
    window.location = 'index'
  } else if (response.status == 400) {
        console.log("usernameWrong");
        outcomeOutput(errorContainer,"usernameWrong","usernameWrong","Username: Invalid User");
  } else if (response.status == 401){
      console.log("passwordWrong");
        outcomeOutput(errorContainer,"passwordWrong","passwordWrong","Password: Invalid Password");
  }
}

function outcomeOutput(container,idHere,classHere,textContent) {
  const error = document.createElement("div");
  error.id = idHere;
  error.classList = classHere;
  error.textContent = textContent;
  container.appendChild(error);
}

async function currentUser(loginInfo) {
  const payload = {
    username: loginInfo.username,
  };
  const response = await fetch('CurrentUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    console.log('user account created');
  } else {
    console.log('failed to add user', response);
  }
}


window.addEventListener('load', pageLoaded);

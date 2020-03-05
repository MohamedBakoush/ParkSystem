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

  const response = await fetch('loginAcc', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    console.log(response);
  }
  else {
    console.log("user cannot log in");
  }
}

window.addEventListener('load', pageLoaded);

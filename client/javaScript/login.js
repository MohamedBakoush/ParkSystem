'use strict';

const elem = {};

async function pageLoaded() {
  loadLoginData();
  prepareHandles();
  addEventListeners();
}

async function prepareHandles() {
  elem.username = document.querySelector("#username");
  elem.password = document.querySelector("#password");
  elem.loginBut = document.querySelector("#loginBut");
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
    window.location = '/'
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

function loadLoginData() {
  const loginContainer = document.getElementById("loginContainer");
  const loginForm = createForm(loginContainer, "loginForm" , "#");
  createSection(loginForm, "h1", "loginHeader", "Login Here");
  createSection(loginForm, "label", "usernameLabel", "Username");
  loginData(loginForm, "text", "username", "username", "Username", true);
  createSection(loginForm,"label", "passwordLabel", "Password");
  loginData(loginForm, "password", "password", "password", "Password", true);

  const loginButtonContainer = createSection(loginForm, "div", "loginButtonContainer");
  createButton(loginButtonContainer, "submit", "loginButton","loginBut", "Login")
}

function createButton(container,type, classHere,idHere, textContent){ // Form maker
  try {
    const button = document.createElement('button');
    button.type = type;
    button.classList = classHere;
    button.id = idHere;
    button.textContent = textContent;
    container.appendChild(button);
    return button;
  } catch (e) {
    return "createButton didnt work";
  }
}

function createForm(container, classHere, action){ // Form maker
  try {
    const form = document.createElement('form');
    form.classList = classHere;
    form.action = action;
    form.onsubmit = function() {return false}
    container.appendChild(form);
    return form;
  } catch (e) {
    return "createForm didnt work";
  }
}

function createSection(container, dataType, classHere, string){ // label maker
  try {
    const section = document.createElement(dataType);
    section.classList = classHere;
    section.textContent = string;
    container.appendChild(section);
    return section;
  } catch (e) {
    return "createSection didnt work";
  }
}

function loginData(container, type, classHere, idHere, placeholder, required){ // Creats input section for loginData
  try {
    const ticketData = document.createElement('input');
    ticketData.type = type;
    ticketData.classList = classHere;
    ticketData.id = idHere;
    ticketData.placeholder = placeholder;
    ticketData.required = required;
    container.appendChild(ticketData);
    return ticketData;
  } catch (e) {
      return "loginData didnt work";
  }
}

window.addEventListener('load', pageLoaded);

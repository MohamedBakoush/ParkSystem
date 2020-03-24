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
  try {
    loginInfo.username = elem.username.value;
    loginInfo.password = elem.password.value;
    checkLogin(loginInfo);
  } catch (e) {
    return "grabEverything Failed";
  }
}

async function checkLogin(loginInfo) {
  const errorContainer = document.getElementById('errors');
  document.getElementById('errors').innerHTML = "";

  const payload = {
    username: loginInfo.username,
    password: loginInfo.password
  };

  const response = await fetch('loginAcc', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    currentUser(loginInfo);
    window.location = '/'
  } else if (response.status == 400) {
    checkLoginOutput(errorContainer,"usernameWrong","usernameWrong","Username: Invalid User");
    return "usernameWrong";
  } else if (response.status == 401){
      checkLoginOutput(errorContainer,"passwordWrong","passwordWrong","Password: Invalid Password");
      return "passwordWrong";
  }
}

function checkLoginOutput(container,idHere,classHere,textContent) {
  try {
    const message = document.createElement("div");
    message.id = idHere;
    message.classList = classHere;
    message.textContent = textContent;
    container.appendChild(message);
    return message;
  } catch (e) {
    return "checkLoginOutput Fail";
  }
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
    return "user account created"
  } else {
    return "failed to add user"
  }
}

function loadLoginData() {
  const loginBody = document.getElementById("loginBody");

  const loginContainer = createSection(loginBody, "section", "loginContainer","loginContainer");

  const loginForm = createForm(loginContainer, "loginForm" , "#");
  createSection(loginForm, "h1", "loginHeader", "loginHeader", "Login Here");
  createSection(loginForm, "label", "usernameLabel", "usernameLabel", "Username");
  loginData(loginForm, "text", "username", "username", "Username", true);
  createSection(loginForm,"label", "passwordLabel", "passwordLabel", "Password");
  loginData(loginForm, "password", "password", "password", "Password", true);

  const loginButtonContainer = createSection(loginForm, "div", "loginButtonContainer");
  createButton(loginButtonContainer, "submit", "loginButton","loginBut", "Login");

  const registerMessages = createSection(loginBody, "section", "loginMessages","loginMessages");
  createSection(registerMessages, "section", "errorsContainer","errors");

  return "loadLoginData";
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
    form.onsubmit = function() {return false};
    container.appendChild(form);
    return form;
  } catch (e) {
    return "createForm didnt work";
  }
}

function createSection(container, dataType, classHere, idHere, string){
  try {
    const section = document.createElement(dataType);
    section.classList = classHere;
    section.id = idHere;
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

module.exports = {
  // export modules
  loginData,
  createSection,
  createForm,
  createButton,
  loadLoginData,
  currentUser,
  checkLoginOutput,
  checkLogin,
  grabEverything,
  addEventListeners,
  prepareHandles,
  pageLoaded,
};

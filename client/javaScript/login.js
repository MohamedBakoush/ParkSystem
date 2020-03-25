'use strict';

// Stores the commonly used elements
const elem = {};

// Runs through the functions on page loading event listener
async function pageLoaded() {
  loadLoginData();
  prepareHandles();
  addEventListeners();
}

// Grabs the handles of the elements and stores them in the elem object
async function prepareHandles() {
  elem.username = document.querySelector("#username");
  elem.password = document.querySelector("#password");
  elem.loginBut = document.querySelector("#loginBut");
}

// Adds event listeners on the elements that require event listeners
async function addEventListeners() {
  elem.loginBut.addEventListener('click', grabEverything);
}

// Grabs the information from the form once the submit button is pressed and stores them in an object
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

/* Create a payload and a sends a POST request to the sever with the log in parameters
   If the response contains an error then it is handled and the correct response is shown
   to the user dependant on the login error*/
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

// Shows the response of the POST request back to the user, in the case of a username or password error
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

// Sends a POST request to the server to change the current user to be the new logged in user
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
    return "user account logged in"
  } else {
    return "failed to log in user"
  }
}

// Handles loading the HTML elements of the login page by calling each function
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

// Handles creating button elements
function createButton(container,type, classHere,idHere, textContent){
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

// Handles creating form elements
function createForm(container, classHere, action){
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

// Handles creating section elements
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

// Handles creation of input elements
function loginData(container, type, classHere, idHere, placeholder, required){
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

// On page load will call the pageLoaded function
window.addEventListener('load', pageLoaded);

// Export modules
module.exports = {
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

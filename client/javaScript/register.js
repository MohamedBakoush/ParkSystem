'use strict';
/*Object to hold the commonly accessed elements*/
const elem = {};

/*Function which will set up handles on elements and event listeners when the page loads*/
async function pageLoaded() {
  loadRegisteData();
  prepareHandles();
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

// Creates an account if the username doesn't exist
async function createUserAccount(userInfo, errorContainer) {
  const payload = {
    username: userInfo.username,
    password: userInfo.password,
    forename: userInfo.forename,
    surname: userInfo.surname,
    email: userInfo.email,
    phoneNum: userInfo.phoneNum
  };
  console.log('Payload', payload);
  // document.getElementById('errors').innerHTML = "";

  const response = await fetch('registerAcc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    console.log('user account created');
    window.location.href = 'login'
  } else if (response.status == 400) {
    console.log("userExist");
    outcomeOutput(errorContainer,"userExist","userExist","Username already exists");
  }
}

function outcomeOutput(container,idHere,classHere,textContent) {
  const error = document.createElement("div");
  error.id = idHere;
  error.classList = classHere;
  error.textContent = textContent;
  container.appendChild(error);
}

/*Gathers all of the values from the form and returns them inside an object*/
function grabEverything() {
  const errorContainer = document.getElementById('errors');
  document.getElementById('errors').innerHTML = "";

  let accountInfo = {};

  if (/[A-Za-z0-9.-]+/.test(elem.username.value)) {
    const splitUsername = elem.username.value.split(" ");
    if (splitUsername.length > 1) {
      console.log("Username: no spaces");
      outcomeOutput(errorContainer,"usernameWrong","usernameWrong","Username: no spaces");

    }else {
      console.log("Valid Username:", elem.username.value);
      accountInfo.username = elem.username.value;
    }
  }else {
    console.log("Username", "only uppercase and lowercase letters and numbers and -");
    outcomeOutput(errorContainer,"usernameWrong","usernameWrong","Username: only uppercase and lowercase letters and numbers and -");
  }

  if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(elem.password.value)) {
    const splitPass = elem.password.value.split(" ");
    if (splitPass.length > 1) {
      console.log("Pass: no spaces");
      outcomeOutput(errorContainer,"passwordWrong","passwordWrong","Password: no spaces");
    }else {
      console.log("Valid Pass:", elem.password.value);
      accountInfo.password = elem.password.value;
    }
  }else{
      console.log("at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
      outcomeOutput(errorContainer,"passwordWrong","passwordWrong","Password: at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
    }

  if (/[A-Za-z]$/.test(elem.forename.value)) {
    const splitForename= elem.forename.value.split(" ");
    if (splitForename.length > 1) {
      console.log("Forename: no spaces");
      outcomeOutput(errorContainer,"forenameWrong","forenameWrong","Forename: no spaces");
    }else {
      console.log("Valid Forename:", elem.forename.value);
      accountInfo.forename = elem.forename.value;
    }
  }else {
    console.log("Forename: letters only");
    outcomeOutput(errorContainer,"forenameWrong","forenameWrong","Forename: letters only");
  }

  if (/[A-Za-z]$/.test(elem.surname.value)) {
    const splitSurname = elem.surname.value.split(" ");
    if (splitSurname.length > 1) {
      console.log("Surnamed: no spaces");
      outcomeOutput(errorContainer,"surnameWrong","surnameWrong","Surnamed: no spaces");
    }else {
      console.log("Valid Surname:", elem.surname.value);
      accountInfo.surname = elem.surname.value;
    }
  }else {
    console.log("Surname: letters only");
    outcomeOutput(errorContainer,"surnameWrong","surnameWrong","Surname: letters only");
  }

  if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(elem.email.value)) {
    const splitEmail= elem.email.value.split(" ");
    if (splitEmail.length > 1) {
      console.log("Email: no spaces");
      outcomeOutput(errorContainer,"emailWrong","emailWrong","Email: no spaces");
    }else {
      console.log("Valid Email:", elem.email.value);
      accountInfo.email = elem.email.value;
    }
  }else {
    console.log("You have entered an invalid email address!");
    outcomeOutput(errorContainer,"emailWrong","emailWrong","Email: invalid email address!");
  }

  if (/^\d{10}$/.test(elem.phoneNum.value)) {
    const splitPhoneNumber = elem.phoneNum.value.split(" ");
    if (splitPhoneNumber.length > 1) {
      console.log("PhoneNumber: no spaces");
      outcomeOutput(errorContainer,"phoneNumberWrong","phoneNumberWrong","PhoneNumber: no spaces");
    }else {
      console.log("Valid PhoneNumber:", elem.phoneNum.value);
      accountInfo.phoneNum = elem.phoneNum.value;
    }
  }else {
    console.log("10 numeric characters only");
    outcomeOutput(errorContainer,"phoneNumberWrong","phoneNumberWrong","PhoneNumber: 10 numeric characters only");
  }

  let count = 0;
  for (const items in accountInfo) {
    count++;
  }
  console.log(count);
  if (count == 6) {
    createUserAccount(accountInfo, errorContainer);
  }

}

function loadRegisteData() {
  const registerBody = document.getElementById("registerBody");

  const registerContainer = createSection(registerBody, "section", "registerContainer","registerContainer");
  const registerForm = createForm(registerContainer, "registerForm" , "#");

  createSection(registerForm, "h1", "registerHeader","registerHeader", "Register Here");

  createSection(registerForm, "label", "usernameLabel", "usernameLabel", "Username:");
  createRegisterInput(registerForm, "text", "username","username", "Username", "[A-Za-z0-9.-]+", "only uppercase and lowercase letters and numbers and dash", true);

  createSection(registerForm, "label", "passwordLabel", "passwordLabel", "Password:");
  createRegisterInput(registerForm, "password", "password","password", "Password", "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}", "At least one number and one uppercase and lowercase letter, and at least 8 or more characters", true);

  createSection(registerForm, "label", "forenameLabel", "forenameLabel", "Forename:");
  createRegisterInput(registerForm, "text", "forename","forename", "Forename", "[A-Za-z]+", "Forename: letters only", true);

  createSection(registerForm, "label", "surnameLabel", "surnameLabel", "Surname:");
  createRegisterInput(registerForm, "text", "surname","surname", "Surname", "[A-Za-z]+", "Surname: letters only", true);

  createSection(registerForm, "label", "emailLabel", "emailLabel", "Email Address:");
  createRegisterInput(registerForm, "email", "email","email", "Email Address", "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$", "xyz@something.com", true);

  createSection(registerForm, "label", "phoneNumLabel", "phoneNumLabel", "Phone Number:");
  createRegisterInput(registerForm, "tel", "phoneNum","phoneNum", "Phone Number", "^d{10}$", "10 numeric characters only", true);

  const registerButtonContainer = createSection(registerForm, "div", "registerButtonContainer", "registerButtonContainer");
  createButton(registerButtonContainer, "submit", "registerButton","regBut", grabEverything, "Register")

  const registerMessages = createSection(registerBody, "section", "registerMessages","registerMessages");
  createSection(registerMessages, "section", "errorsContainer","errors");
}

function createRegisterInput(container,type, classHere,idHere, placeholder, pattern, title, required){
  try {
    const input = document.createElement('input');
    input.type = type;
    input.classList = classHere;
    input.id = idHere;
    input.placeholder = placeholder;
    input.pattern = pattern;
    input.title = title;
    input.required = required;
    container.appendChild(input);
    return input;
  } catch (e) {
    return "createRegisterInput didnt work";
  }
}

function createButton(container,type, classHere,idHere,onclick, textContent){ // Form maker
  try {
    const button = document.createElement('button');
    button.type = type;
    button.classList = classHere;
    button.id = idHere;
    button.onclick = onclick;
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


function createSection(container, dataType, classHere, idHere, string){ // label maker
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


/*Once page has loaded, will call function pageLoaded*/
window.addEventListener('load', pageLoaded);

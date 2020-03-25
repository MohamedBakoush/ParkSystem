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
  const response = await fetch('registerAcc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    window.location.href = 'login'
  } else if (response.status == 400) {
    document.getElementById('errors').innerHTML = "";
    checkRegisterOutput(errorContainer,"userExist","userExist","Username already exists");
  }
}

function checkRegisterOutput(container,idHere,classHere,textContent) {
  try {
    const message = document.createElement("div");
    message.id = idHere;
    message.classList = classHere;
    message.textContent = textContent;
    container.appendChild(message);
    return message;
  } catch (e) {
    return "checkRegisterOutput failed";
  }
}

/*Gathers all of the values from the form and returns them inside an object*/
function grabEverything() {

  try {
    const errorContainer = document.getElementById('errors');
    document.getElementById('errors').innerHTML = "";

    let accountInfo = {};

    if (/[A-Za-z0-9.-]+/.test(elem.username.value)) {
      const splitUsername = elem.username.value.split(" ");
      if (splitUsername.length > 1) {
        checkRegisterOutput(errorContainer,"usernameWrong","usernameWrong","Username: no spaces");
      }else {
        accountInfo.username = elem.username.value;
      }
    }else {
      checkRegisterOutput(errorContainer,"usernameWrong","usernameWrong","Username: only uppercase and lowercase letters and numbers and -");
    }

    if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(elem.password.value)) {
      const splitPass = elem.password.value.split(" ");
      if (splitPass.length > 1) {
        checkRegisterOutput(errorContainer,"passwordWrong","passwordWrong","Password: no spaces");
      }else {
        accountInfo.password = elem.password.value;
      }
    }else{
      checkRegisterOutput(errorContainer,"passwordWrong","passwordWrong","Password: at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
      }

    if (/[A-Za-z]$/.test(elem.forename.value)) {
      const splitForename= elem.forename.value.split(" ");
      if (splitForename.length > 1) {
        checkRegisterOutput(errorContainer,"forenameWrong","forenameWrong","Forename: no spaces");
      }else {
        accountInfo.forename = elem.forename.value;
      }
    }else {
      checkRegisterOutput(errorContainer,"forenameWrong","forenameWrong","Forename: letters only");
    }

    if (/[A-Za-z]$/.test(elem.surname.value)) {
      const splitSurname = elem.surname.value.split(" ");
      if (splitSurname.length > 1) {
        checkRegisterOutput(errorContainer,"surnameWrong","surnameWrong","Surnamed: no spaces");
      }else {
        accountInfo.surname = elem.surname.value;
      }
    }else {
      checkRegisterOutput(errorContainer,"surnameWrong","surnameWrong","Surname: letters only");
    }

    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(elem.email.value)) {
      const splitEmail= elem.email.value.split(" ");
      if (splitEmail.length > 1) {
        checkRegisterOutput(errorContainer,"emailWrong","emailWrong","Email: no spaces");
      }else {
        accountInfo.email = elem.email.value;
      }
    }else {
      checkRegisterOutput(errorContainer,"emailWrong","emailWrong","Email: invalid email address!");
    }

    if (/^\d{10}$/.test(elem.phoneNum.value)) {
      const splitPhoneNumber = elem.phoneNum.value.split(" ");
      if (splitPhoneNumber.length > 1) {
        checkRegisterOutput(errorContainer,"phoneNumberWrong","phoneNumberWrong","PhoneNumber: no spaces");
      }else {
        accountInfo.phoneNum = elem.phoneNum.value;
      }
    }else {
      checkRegisterOutput(errorContainer,"phoneNumberWrong","phoneNumberWrong","PhoneNumber: 10 numeric characters only");
    }

    let count = 0;
    for (const items in accountInfo) {  // eslint-disable-line
      count++;
    }

    if (count == 6) {
      createUserAccount(accountInfo, errorContainer);
    }
  } catch (e) {
    return "grabEverything Failed";
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
  createButton(registerButtonContainer, "submit", "registerButton","regBut", grabEverything, "Register");

  const registerMessages = createSection(registerBody, "section", "registerMessages","registerMessages");
  createSection(registerMessages, "section", "errorsContainer","errors");

  return "loadRegisteData";
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


/*Once page has loaded, will call function pageLoaded*/
window.addEventListener('load', pageLoaded);


module.exports = {
  // export modules
  createSection,
  createForm,
  createButton,
  createRegisterInput,
  loadRegisteData,
  grabEverything,
  checkRegisterOutput,
  createUserAccount,
  prepareHandles,
  pageLoaded
};

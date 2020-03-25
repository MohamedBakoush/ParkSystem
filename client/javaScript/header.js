'use strict';

async function showHeaderInfo() { // header info thats being displayed in html
  const user = await getCurrentUser(); // asaign user from getCurrentUser
  const container = document.getElementById("headerNav"); // get element id from html and asign it congtainer
  const logoContainer = makeElement(container, "section", "logoLinks", "logoLinks"); // create logo container
  contentInfo(logoContainer, "a", "Logo", "Logo", "ParkSystem", "/"); // create logo
  if (user.username === undefined) { // if user is undefined
    const accInfoContainer = makeElement(container, "ul", "signinLinks", "signinLinks"); // create account Info Container
    const accInfoRegister = makeElement(accInfoContainer, "li"); // create register contaienr
    const accInfoLogin = makeElement(accInfoContainer, "li"); // create login container
    contentInfo(accInfoLogin, "a", "login", "login", "login", "login"); // show/create login
    contentInfo(accInfoRegister, "a", "register", "register", "register", "register"); // show/create register
  } else { // if user is defined
    const accInfoContainerLogin = makeElement(container, "ul", "loginUser", "loginUser"); // create account Info Container
    const accInfoUsername = makeElement(accInfoContainerLogin, "li"); // create loged in user contaiener
    const accInfoLogout = makeElement(accInfoContainerLogin, "li"); // create logout container
    contentInfo(accInfoUsername, "a", "LoginUser", "LoginUser", user.username, "#"); // show/create username
    createBtn(accInfoLogout, "input", "button", "logout", "logout", "logout", logout); // show/create logout
  }
  return "ShowHeaderInfo works"; // return that fucntion worked
}

function createBtn(container, elementType, type, classHere , idHere, value, onclick){// take inputs aand output element
  try { // if inputs are valid
    const element = document.createElement(elementType); // create element
    element.type = type; // asign type
    element.classList = classHere; // asign class
    element.id = idHere; // asign id
    element.value  = value; // asign value
    element.onclick = onclick; // assign onlick
    container.appendChild(element); // put element inside container
    return element; // return element
  } catch (e) { // if inputs are invalid
    return "Button didnt create"; // return fail
  }
}

function makeElement(container, elementTypeList, classHere, idHere){ // take inputs aand output elementType
  try { // if inputs are valid
    const elementType = document.createElement(elementTypeList); // create element
    elementType.classList = classHere; // assign class
    elementType.id = idHere; // assign id
    container.appendChild(elementType); // put elementType inside container
    return elementType; // return elementType
  } catch (e) { // if inputs are invalid
    return "makeElement did not work"; // return fail
  }
}

function contentInfo(container, elementType, classHere , idHere, textContent, href){ // take inputs aand output element
  try { // if inputs are valid
    const element = document.createElement(elementType); // create element
    element.classList = classHere; // assign class
    element.id = idHere; // assign id
    element.href = href; // asign herf
    element.textContent  = textContent; // asign textContent
    container.appendChild(element); // put element inside container
    return element; // return element
  } catch (e) { // if inputs are invalid
    return "contentInfo did not work"; // return fail
  }
}

async function getCurrentUser() { // get current login in user
  const response = await fetch(`CurrentUser`); // get current user thats login from database
  let user;
  if (response.ok) { // if respons ok, assign user CurrentUser
    user = await response.json();
  } else { // if respons fails, assign user msg
    user = { msg: 'failed to load messages' };
  }
  return user; // return user
}


async function logout() { // contact the server ask to log gout user
  const user = await getCurrentUser(); // assign user from getCurrentUser
  const response = await fetch('logOutAcc', { // request user to be loged out
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });
  if (response.ok) { // if the response was successful, website reloads
    window.location.reload();
  } else if (response.status == 400) { // if the response returns 400, the request have failed
      return "LogOut Failed"; // return fail
  }
}

window.addEventListener('DOMContentLoaded', showHeaderInfo); // load showHeaderInfo when html page loads

module.exports = { // export modules
  showHeaderInfo,
  createBtn,
  makeElement,
  contentInfo,
  getCurrentUser,
  logout
};

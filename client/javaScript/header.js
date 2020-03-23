
async function showHeaderInfo() {
  const user = await getCurrentUser();
  const container = document.getElementById("headerNav");
  const logoContainer = makeElement(container, "section", "logoLinks", "logoLinks");
  contentInfo(logoContainer, "a", "Logo", "Logo", "ParkSystem", "/");

  if (user.username === undefined) {
    console.log("undefined");
    const accInfoContainer = makeElement(container, "ul", "signinLinks", "signinLinks");
    const accInfoRegister = makeElement(accInfoContainer, "li");
    const accInfoLogin = makeElement(accInfoContainer, "li");
    contentInfo(accInfoLogin, "a", "login", "login", "login", "login");
    contentInfo(accInfoRegister, "a", "register", "register", "register", "register");
  } else {
    console.log(user.username);
    const accInfoContainer = makeElement(container, "ul", "loginUser", "loginUser");
    const accInfoUsername = makeElement(accInfoContainer, "li");
    const accInfoLogout = makeElement(accInfoContainer, "li");
    contentInfo(accInfoUsername, "a", "LoginUser", "LoginUser", user.username, "#");
    createBtn(accInfoLogout, "input", "button", "logout", "logout", "logout", logout);
  }
  return "ShowHeaderInfo works";
}

function createBtn(container, elementType, type, classHere , idHere, textContent, onclick){
  try {
    const element = document.createElement(elementType);
    element.type = type;
    element.classList = classHere;
    element.id = idHere;
    element.value  = textContent;
    element.onclick = onclick;
    container.appendChild(element);
    return element;
  } catch (e) {
    return "Button didnt create";
  }
}

function makeElement(container, elementTypeList, classHere, idHere){
  try {
    const elementType = document.createElement(elementTypeList);
    elementType.classList = classHere;
    elementType.id = idHere;
    container.appendChild(elementType);
    return elementType;
  } catch (e) {
    return "makeElement did not work";
  }
}

function contentInfo(container, elementType, classHere , idHere, textContent, href){
  try {
    const element = document.createElement(elementType);
    element.classList = classHere;
    element.id = idHere;
    element.href = href;
    element.textContent  = textContent;
    container.appendChild(element);
    return element;
  } catch (e) {
    return "contentInfo did not work";
  }
}

async function getCurrentUser() {
  const response = await fetch(`CurrentUser`);
  let user;
  if (response.ok) {
    user = await response.json();
  } else {
    user = { msg: 'failed to load messages' };
  }
  return user;
}


async function logout() {
  const user = await getCurrentUser();
  const response = await fetch('logOutAcc', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });
  if (response.ok) {
    console.log("LogOut");
    window.location.reload();
  } else if (response.status == 400) {
      console.log("LogOut Failed");
  }
}

window.addEventListener('load', showHeaderInfo);
module.exports = {
  // export modules
  showHeaderInfo,
  makeElement,
  contentInfo,
};

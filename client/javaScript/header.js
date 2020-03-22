
function showHeaderInfo(user) {

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
    const accInfo = makeElement(accInfoContainer, "li");
    contentInfo(accInfo, "a", "LoginUser", "LoginUser", user.username, "#");
  }

  return "ShowHeaderInfo works";
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
 
  showHeaderInfo(user);
}

window.addEventListener('load', getCurrentUser);
module.exports = {
  // export modules
  showHeaderInfo,
  makeElement,
  contentInfo,
};

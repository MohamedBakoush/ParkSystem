
function showHeader_Info() {
  const container = document.getElementById("headerNav");
  const logoContainer = makeElement(container, "section", "logoLinks", "logoLinks");
  contentInfo(logoContainer, "a", "Logo", "Logo", "ParkSystem", "/");

  const accInfoContainer = makeElement(container, "ul", "signinLinks", "signinLinks");
  const accInfoRegister = makeElement(accInfoContainer, "li");
  const accInfoLogin = makeElement(accInfoContainer, "li");
  contentInfo(accInfoLogin, "a", "login", "login", "login", "#");
  contentInfo(accInfoRegister, "a", "register", "register", "register", "#");
}

function makeElement(container, elementTypeList, classHere, idHere){
  const elementType = document.createElement(elementTypeList);
  elementType.classList = classHere;
  elementType.id = idHere;
  container.appendChild(elementType);
  return elementType;
}

function contentInfo(container, elementType, classHere , idHere, textContent, href){
  const element = document.createElement(elementType);
  element.classList = classHere;
  element.id = idHere;
  element.href = href;
  element.textContent  = textContent;
  container.appendChild(element);
  return element;
}

function pageLoaded() {
  showHeader_Info();
}

window.addEventListener('load', pageLoaded);



module.exports = {
  // export modules
  showHeader_Info,
  makeElement,
  contentInfo,
};

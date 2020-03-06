function showHeader_Info() {
  const nav = document.getElementById('headerNav');
  const logoLinks = document.getElementById('logoLinks');
  const signinLinks = document.getElementById('signinLinks')
  headerContainer(logoLinks,"li", "a", "Logo" , "Logo", "ParkSystem", "/");
  headerContainer(signinLinks,"li", "a", "login" , "login", "login", "#");
  headerContainer(signinLinks,"li", "a", "register" , "register", "Register", "#");
}


function headerContainer(container, type1, type2, classHere , idHere, textContent, href){
  const item = document.createElement(type1);
  container.appendChild(item);
  const aa = document.createElement(type2);
  aa.classList = classHere;
  aa.id = idHere;
  aa.href = href;
  aa.textContent  = textContent;
  item.appendChild(aa);
}
function pageLoaded() {
  showHeader_Info();
}

window.addEventListener('load', pageLoaded);

'use strict'

const {
    showHeaderInfo, createBtn, makeElement,
    contentInfo, getCurrentUser, logout
} = require('./header'); // import functions from header

global.window = Object.create(window); // create a window
const url = "http://localhost:8080";  // set url with index url
Object.defineProperty(window, 'location', {
  value: {
    href: url  // url that these test will use
  }
});

describe('header', function () {
  const createElement = document.createElement("section"); // create an element  for testion purposes
  function testFunction() {  // create function for testion purposes
    const x = 1;
    return x;
  }
  it('check createBtn', () => { // test for createBtn function
    const createFail = createBtn();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("Button didnt create");

    const create = createBtn(createElement, "input", "button", "logout", "logout", "logout", testFunction);
    expect(create).toBeDefined();
    expect(create.type).toBe("button");
    expect(create.classList[0]).toBe("logout");
    expect(create.id).toBe("logout");
    expect(create.value).toBe("logout");
    expect(create.onclick).toBe(testFunction);
  });

  it('check showInfo', async () => { // test for showInfo function
    const showInfo = showHeaderInfo();
    expect(showInfo).toBeDefined();
  });

  it('check makeElement', () => { // test for makeElement function
    const make = makeElement(createElement, "a", "classHere", "idHere");
    expect(make).toBeDefined();
    expect(make.classList[0]).toBe("classHere");
    expect(make.id).toBe("idHere");

    const makeNA = makeElement();
    expect(makeNA).toBeDefined();
    expect(makeNA).toBe("makeElement did not work");
  });

  it('check contentInfo', () => { // test for contentInfo function
    const info = contentInfo(createElement, "a", "classHere", "idHere", "login", "example.html");
    expect(info).toBeDefined();
    expect(info.classList[0]).toBe("classHere");
    expect(info.id).toBe("idHere");
    expect(info.textContent).toBe("login");
    expect(info.href).toBe("http://localhost/example.html");

    const infoNA = contentInfo();
    expect(infoNA).toBeDefined();
    expect(infoNA).toBe("contentInfo did not work");
  });

  it('check getCurrentUser', async () => { // test for getCurrentUser function
    const currentUser = getCurrentUser();
    expect(currentUser).toBeDefined();
  });

  it('check logout', async () => {  // test for logout function
    const out = logout();
    expect(out).toBeDefined();
  });
  
})

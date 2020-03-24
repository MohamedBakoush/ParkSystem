'use strict'
const {
  showHeaderInfo,
  createBtn,
  makeElement,
  contentInfo,
  getCurrentUser,
  logout } = require('./header');

global.window = Object.create(window);
const url = "http://localhost:8080";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});

describe('header', function () {
  const createElement = document.createElement("section");
  function testFunction() {
    const x = 1;
    return x;
  }
  it('check createBtn', () => {
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

  it('check showInfo', async () => {
    const showInfo = showHeaderInfo();
    expect(showInfo).toBeDefined();
  });
  it('check makeElement', () => {
    const make = makeElement(createElement, "a", "classHere", "idHere");
    expect(make).toBeDefined();
    expect(make.classList[0]).toBe("classHere");
    expect(make.id).toBe("idHere");

    const makeNA = makeElement();
    expect(makeNA).toBeDefined();
    expect(makeNA).toBe("makeElement did not work");
  });

  it('check contentInfo', () => {
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
  it('check getCurrentUser', async () => {
    const currentUser = getCurrentUser();
    expect(currentUser).toBeDefined();
  });
  it('check logout', async () => {
    const out = logout();
    expect(out).toBeDefined();
  });
})

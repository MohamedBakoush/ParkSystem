'use strict'
const { showHeaderInfo, makeElement, contentInfo,} = require('./header');

global.window = Object.create(window);
const url = "http://localhost:8080";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});

describe('header', function () {
  const createElement = document.createElement("section");

  it('check showInfo', () => {
    const showInfo = showHeaderInfo();
    expect(showInfo).toBeDefined();
    expect(showInfo).toBe("ShowHeaderInfo works");
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
})

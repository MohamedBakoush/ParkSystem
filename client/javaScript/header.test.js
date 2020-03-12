'use strict'
const { makeElement, contentInfo} = require('./header');

describe('ticket', function () {
  const createElement = document.createElement("section");

  it('check makeElement', () => {
    const make = makeElement(createElement, "a", "classHere", "idHere");
    expect(make).toBeDefined();
    expect(make.classList[0]).toBe("classHere");
    expect(make.id).toBe("idHere");
  });

  it('check contentInfo', () => {
    const info = contentInfo(createElement, "a", "classHere", "idHere", "login", "example.html");
    expect(info).toBeDefined();
    expect(info.classList[0]).toBe("classHere");
    expect(info.id).toBe("idHere");
    expect(info.textContent).toBe("login");
    expect(info.href).toBe("http://localhost/example.html");
  });
})

'use strict'

const { loginData, createSection, createForm,
        createButton, loadLoginData, currentUser,
        checkLoginOutput, checkLogin, grabEverything,
        addEventListeners, prepareHandles, pageLoaded
      } = require('./login'); // import functions from login


describe('login', function () {

  const createElement = document.createElement("section"); // create an element  for testion purposes

  it('check loginData', () => {  // test for loginData function
    const createFail = loginData();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("loginData didnt work");

    const create = loginData(createElement, "text", "classHere", "idHere", "placeholder", true);
    expect(create).toBeDefined();
    expect(create.type).toBe("text");
    expect(create.classList[0]).toBe("classHere");
    expect(create.id).toBe("idHere");
    expect(create.placeholder).toBe("placeholder");
    expect(create.required).toBe(true);
  });

  it('check createSection', () => {   // test for createSection function
    const createFail = createSection();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createSection didnt work");

    const create = createSection(createElement, "section", "classHere", "idHere", "string");
    expect(create).toBeDefined();
    expect(create.classList[0]).toBe("classHere");
    expect(create.id).toBe("idHere");
  });

  it('check createForm', () => { // test for createForm function
    const createFail = createForm();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createForm didnt work");

    const create = createForm(createElement, "loginForm" , "#");
    expect(create).toBeDefined();
    expect(create.classList[0]).toBe("loginForm");
    expect(create.action).toBe("http://localhost/#");
  });

  it('check createButton', () => { // test for createButton function
    const createFail = createButton();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createButton didnt work");

    const create = createButton(createElement, "submit", "loginButton","loginBut", "Login");
    expect(create).toBeDefined();
    expect(create.type).toBe("submit");
    expect(create.classList[0]).toBe("loginButton");
    expect(create.id).toBe("loginBut");
    expect(create.textContent).toBe("Login");
  });

  it('check loadLoginData', () => { // test for loadLoginData function
    const loginData = loadLoginData();
    expect(loginData).toBeDefined();
    expect(loginData).toBe("loadLoginData");
  });

  it('check currentUser', async () => { // test for currentUser function
    const current = currentUser();
    expect(current).toBeDefined();
  });

  it('check checkLoginOutput', () => { // test for checkLoginOutput function
    const checkLoginOutputFail = checkLoginOutput();
    expect(checkLoginOutputFail).toBeDefined();
    expect(checkLoginOutputFail).toBe("checkLoginOutput Fail");

    const checkLoginOutputOK = checkLoginOutput(createElement, "idHere","classHere","textContent");
    expect(checkLoginOutputOK).toBeDefined();
    expect(checkLoginOutputOK.id).toBe("idHere");
    expect(checkLoginOutputOK.classList[0]).toBe("classHere");
    expect(checkLoginOutputOK.textContent).toBe("textContent");
  });

  it('check checkLogin', async() => { // test for checkLogin function
    const check = checkLogin();
    expect(check).toBeDefined();
  });

  it('check grabEverything', () => { // test for grabEverything function
    const grabFail = grabEverything();
    expect(grabFail).toBeDefined();
  });

  it('check addEventListeners', async () => { // test for addEventListeners function
    const eventListeners = addEventListeners();
    expect(eventListeners).toBeDefined();
  });

  it('check prepareHandles', async () => { // test for prepareHandles function
    const handles = prepareHandles();
    expect(handles).toBeDefined();
  });

  it('check pageLoaded', async () => { // test for pageLoaded function
    const load = pageLoaded();
    expect(load).toBeDefined();
  });

})

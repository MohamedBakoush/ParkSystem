'use strict'
const {
  createSection, createForm, createButton,
  createRegisterInput, loadRegisteData, grabEverything,
  checkRegisterOutput, createUserAccount, prepareHandles,
  pageLoaded
} = require('./register');  // import functions from register

describe('register', function () {
  const createElement = document.createElement("section");  // create an element  for testion purposes

  it('check createSection', () => { // test for createSection function
    const create = createSection(createElement, "section", "classHere", "idHere", "string");
    expect(create).toBeDefined();
    expect(create.classList[0]).toBe("classHere");
    expect(create.id).toBe("idHere");
    expect(create.textContent).toBe("string");

    const createFail = createSection();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createSection didnt work");
  });

  it('check createForm', () => { // test for createForm function
    const create = createForm(createElement, "classHere", "action");
    expect(create).toBeDefined();
    expect(create.classList[0]).toBe("classHere");
    expect(create.action).toBe("http://localhost/action");

    const createFail = createForm();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createForm didnt work");
  });

  it('check createButton', () => { // test for createButton function
    function testFunction() {
      return 1;
    }
    const create = createButton(createElement, "submit", "classHere","idHere", testFunction, "textContent");
    expect(create).toBeDefined();
    expect(create.type).toBe("submit");
    expect(create.classList[0]).toBe("classHere");
    expect(create.id).toBe("idHere");
    expect(create.onclick).toBe(testFunction);
    expect(create.textContent).toBe("textContent");

    const createFail = createButton();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createButton didnt work");
  });


  it('check createRegisterInput', () => { // test for createRegisterInput function
    const create = createRegisterInput(createElement, "text", "class","id", "placeholder", "[A-Za-z0-9.-]+", "only uppercase and lowercase letters and numbers and dash", true);
    expect(create).toBeDefined();
    expect(create.type).toBe("text");
    expect(create.classList[0]).toBe("class");
    expect(create.id).toBe("id");
    expect(create.placeholder).toBe("placeholder");
    expect(create.pattern).toBe("[A-Za-z0-9.-]+");
    expect(create.title).toBe("only uppercase and lowercase letters and numbers and dash");
    expect(create.required).toBe(true);

    const createFail = createRegisterInput();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createRegisterInput didnt work");
  });


  it('check loadRegisteData', () => {// test for loadRegisteData function
    const load = loadRegisteData();
    expect(load).toBeDefined();
    expect(load).toBe("loadRegisteData");
  });

  it('check grabEverything', () => { // test for grabEverything function
    const grab = grabEverything();
    expect(grab).toBeDefined();
  });

  it('check checkRegisterOutput', () => {  // test for checkRegisterOutput function
    const checkRegisterFail = checkRegisterOutput();
    expect(checkRegisterFail).toBeDefined();
    expect(checkRegisterFail).toBe("checkRegisterOutput failed");

    const checkRegister = checkRegisterOutput(createElement,"id","class","textContent");
    expect(checkRegister).toBeDefined();
    expect(checkRegister.id).toBe("id");
    expect(checkRegister.classList[0]).toBe("class");
    expect(checkRegister.textContent).toBe("textContent");
  });

  it('check createUserAccount', async () => {  // test for createUserAccount function
    const userAccount = createUserAccount();
    expect(userAccount).toBeDefined();
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

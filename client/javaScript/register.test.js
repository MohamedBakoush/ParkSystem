'use strict'
const {
  createSection,
  createForm,
  createButton,
  createRegisterInput,
  loadRegisteData,
  grabEverything,
  checkRegisterOutput,
  createUserAccount,
  prepareHandles,
  pageLoaded
} = require('./register');

describe('register', function () {
  const createElement = document.createElement("section");

  it('check createSection', () => {
    const create = createSection(createElement, "section", "classHere", "idHere", "string");
    expect(create).toBeDefined();
    expect(create.classList[0]).toBe("classHere");
    expect(create.id).toBe("idHere");
    expect(create.textContent).toBe("string");

    const createFail = createSection();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createSection didnt work");
  });



  it('check createForm', () => {
    const create = createForm(createElement, "classHere", "action");
    expect(create).toBeDefined();
    expect(create.classList[0]).toBe("classHere");
    expect(create.action).toBe("http://localhost/action");

    const createFail = createForm();
    expect(createFail).toBeDefined();
    expect(createFail).toBe("createForm didnt work");
  });

  it('check createButton', () => {
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


  it('check createRegisterInput', () => {
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


  it('check loadRegisteData', () => {
    const load = loadRegisteData();
    expect(load).toBeDefined();
    expect(load).toBe("loadRegisteData");
  });

  it('check grabEverything', () => { // TODO:
    const grab = grabEverything();
    expect(grab).toBeDefined();
    expect(grab).toBe("grabEverything Failed");
  });

  it('check checkRegisterOutput', () => {
    const checkRegisterFail = checkRegisterOutput();
    expect(checkRegisterFail).toBeDefined();
    expect(checkRegisterFail).toBe("checkRegisterOutput failed");

    const checkRegister = checkRegisterOutput(createElement,"id","class","textContent");
    expect(checkRegister).toBeDefined();
    expect(checkRegister.id).toBe("id");
    expect(checkRegister.classList[0]).toBe("class");
    expect(checkRegister.textContent).toBe("textContent");
  });

  it('check createUserAccount', async () => {
    const userAccount = createUserAccount();
    expect(userAccount).toBeDefined();
  });

  it('check prepareHandles', async () => {
    const handles = prepareHandles();
    expect(handles).toBeDefined();
  });

  it('check pageLoaded', async () => {
    const load = pageLoaded();
    expect(load).toBeDefined();
  });
})

'use strict'
const {
  listCurrentUser,
  addCurrentUser,
  findUser,
  logIn,
  logOut,
  addUser,
  removeUser,
  getAllUsers } = require('./userInfo');


  describe('userInfo', function () {

    it('check listCurrentUser', () => {
      const list = listCurrentUser();
      expect(list).toBeDefined();
    });

    it('check addCurrentUser', () => {
      const add = addCurrentUser();
      expect(add).toBeDefined();
    });

    it('check findUser', () => {
      const find = findUser();
      expect(find).toBeDefined();
    });

    it('check logIn', () => {
      const log = logIn("username", "password");
      expect(log).toBeDefined();
      expect(log).toBe("user Login");

      const wrongPass = logIn("username");
      expect(wrongPass).toBeDefined();
      expect(wrongPass).toBe("passwordWrong");

      const wrongUser = logIn("aksmd");
      expect(wrongUser).toBeDefined();
      expect(wrongUser).toBe("usernameWrong");
    });

    it('check logOut', () => {
      const log = logOut();
      expect(log).toBeDefined();
    });

    it('check addUser', () => {
      const user = addUser();
      expect(user).toBeDefined();
    });

    it('check removeUser', () => {
      const remove = removeUser();
      expect(remove).toBeDefined();
    });

    it('check getAllUsers', () => {
      const get = getAllUsers();
      expect(get).toBeDefined();
      expect(Array.isArray([get])).toBe(true);
    });

  })

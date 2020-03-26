'use strict'
const {
  listCurrentUser, addCurrentUser, findUser,
  logIn, logOut, addUser, removeUser,
  getAllUsers
} = require('./userInfo');// import functions from userInfo


  describe('userInfo', function () {

    it('check listCurrentUser', () => { // test for listCurrentUser function
      const list = listCurrentUser();
      expect(list).toBeDefined();
    });

    it('check addCurrentUser', () => { // test for addCurrentUser function
      const add = addCurrentUser();
      expect(add).toBeDefined();
    });

    it('check findUser', () => {// test for findUser function
      const find = findUser(undefined);
      expect(find).toBeDefined();
    });

    it('check logIn', () => {// test for logIn function
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

    it('check logOut', () => {// test for logOut function
      const log = logOut();
      expect(log).toBeDefined();
    });

    it('check addUser', () => {// test for addUser function
      const user = addUser();
      expect(user).toBeDefined();
    });

    it('check removeUser', () => {// test for removeUser function
      const remove = removeUser();
      expect(remove).toBeDefined();
    });

    it('check getAllUsers', () => {// test for getAllUsers function
      const get = getAllUsers();
      expect(get).toBeDefined();
      expect(Array.isArray([get])).toBe(true);
    });

  })

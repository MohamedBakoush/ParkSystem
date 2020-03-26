'use strict'
const {
  listCurrentUser, addCurrentUser, findUser,
  logIn, logOut, addUser, getAllUsers
} = require('./userInfo');// import functions from userInfo


  describe('userInfo', function () {

    it('check listCurrentUser', () => { // test for listCurrentUser function
      const listNoExist = listCurrentUser();
      expect(listNoExist).toBeDefined();
      expect(listNoExist.username).toBe(undefined);
      addCurrentUser("username"); // add username to currentUser
      const listYesExist = listCurrentUser();
      expect(listYesExist).toBeDefined();
      expect(listYesExist.username).toBe("username");
    });

    it('check addCurrentUser', () => { // test for addCurrentUser function
      const add = addCurrentUser("newUser");
      expect(add).toBeDefined();
      expect(add.username).toBe("newUser");
    });

    it('check findUser', () => {// test for findUser function
      const findExists = findUser("username");
      expect(findExists).toBeDefined();
      expect(findExists.username).toBe("username");
      expect(findExists.password).toBe("password");
      expect(findExists.forename).toBe("forename");
      expect(findExists.surname).toBe("surname");
      expect(findExists.email).toBe("email");
      expect(findExists.phoneNum).toBe("phoneNum");

      const findFail = findUser(undefined);
      expect(findFail).toBeDefined();
      expect(findFail.loggedIn).toBe(false);
    });

    it('check logIn', () => {// test for logIn function
      const log = logIn("username", "password"); // username and password exists in userInfo.json
      expect(log).toBeDefined();
      expect(log).toBe("user Login");

      const wrongPass = logIn("username"); //username exists in userInfo.json but not password
      expect(wrongPass).toBeDefined();
      expect(wrongPass).toBe("passwordWrong");

      const wrongUser = logIn("aksmd"); // username dosent exist in userInfo.json
      expect(wrongUser).toBeDefined();
      expect(wrongUser).toBe("usernameWrong");
    });

    it('check logOut', () => {// test for logOut function
      const log = logOut();
      expect(log).toBeDefined();
      expect(log).toBe("LogOut");
    });

    it('check addUser', () => {// test for addUser function
      const user = addUser(undefined);
      expect(user).toBeDefined();
      expect(user).toBe("userExist");
    });

    it('check getAllUsers', () => {// test for getAllUsers function
      const get = getAllUsers();
      const user = get.username; // get user usrname from getAllUsers
      expect(get).toBeDefined();
      expect(user.username).toBe("username");
      expect(user.password).toBe("password");
      expect(user.forename).toBe("forename");
      expect(user.surname).toBe("surname");
      expect(user.email).toBe("email");
      expect(user.phoneNum).toBe("phoneNum");
      expect(user.loggedIn).toBe(true || false);
      expect(Array.isArray([get])).toBe(true);
    });

  })

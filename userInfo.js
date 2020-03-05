'use strict';

let users = [
  {
    username: "Heisenburg",
    password: "meth",
    forename: "Walter",
    surname: "White",
    email: "email@email.com",
    phoneNum: "BetterCallSaul",
    loggedIn: false
  }

];

// Finds a user by username
function findUser(username){
  for (const user of users) {
    if (user.username === username) {
      return user;
    }
  }
  return null;
}

// Find the username and will compare the username and password or the account with the given parameters
function logIn(username, password) {
  const user = findUser(username);
  if (user !== null) {
    if (user.password === password) {
      user.loggedIn = true;
      return "user logged in";
    }
    return "password wrong";
  }
  return "username wrong";
}

// Adds a user to the database if the username doesn't exist
function addUser(username, password, forename, surname, email, phoneNum) {
  if (findUser(username) === null) {
    const newUser = {
      username: username,
      password,
      forename,
      surname,
      email,
      phoneNum,
      loggedIn: false,
    };
    users = [newUser, ...users.slice(0)];
    return newUser;
  }
}

// Removes a user
function removeUser(username) {
  for (let i = 0; i <= users.length; i++) {
    if (users[i].username === username) {
      users.splice(i, 1);
    }
  }
}

// Shows all of the user in /registerAcc
function getAllUsers() {
  return users;
}

module.exports = {
  addUser,
  getAllUsers,
  removeUser,
  logIn,
};

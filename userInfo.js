'use strict';

const FileSystem = require('fs');
const data = FileSystem.readFileSync('userInfo.json');
const users = JSON.parse(data);


let currentUser = {username: undefined};

// returns CurrentUser details
function listCurrentUser() {
  return currentUser;
}

// add login user to current user (currentlu login in)
function addCurrentUser(username) {
    const newCurrentUser = {
      username: username,
    };
    currentUser = newCurrentUser;
    return newCurrentUser;
}

// Finds a user by username
function findUser(id){
 if (users[id] === undefined) {
   return undefined;
 } else {
   return users[id];
 }

}

// Find the username and will compare the username and password or the account with the given parameters
function logIn(username, password) {
  const user = findUser(username);
  if (user !== undefined) {
    if (user.password === password) {
      user.loggedIn = true;
      return "user Login";
    }
    return "passwordWrong";
  }
  return "usernameWrong";
}

// Log out the user
function logOut(username) {
  const user = findUser(username);
  if (user !== undefined) {
    user.loggedIn = false;
    currentUser = {};
    return "LogOut";
  }else {
    return "noUserFound"
  }
}

// Adds a user to the database if the username doesn't already exist
function addUser(username, password, forename, surname, email, phoneNum) {
  if (findUser(username) == undefined) {
    users[`${username}`] = {
      username: username,
      password,
      forename,
      surname,
      email,
      phoneNum,
      loggedIn: false,
    };
    const newData = JSON.stringify(users, null, 2);
    FileSystem.writeFileSync('userInfo.json', newData);
    return "addedUser"
  }else {
    return "userExist";
  }
}

// Removes a user
function removeUser(username) {
  delete users[username];
  return "deleted";
}

// Shows all of the user in /registerAcc
function getAllUsers() {
  return users;
}


module.exports = {
  listCurrentUser,
  addCurrentUser,
  findUser,
  logIn,
  logOut,
  addUser,
  removeUser,
  getAllUsers
};

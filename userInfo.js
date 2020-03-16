'use strict';

const FileSystem = require('fs');
const data = FileSystem.readFileSync('userInfo.json');
const users = JSON.parse(data);

// Finds a user by username
function findUser(id){
 if (users[id] === undefined) {
   return undefined;
 }
 else {
   return users[id];
 }

}

// Find the username and will compare the username and password or the account with the given parameters
function logIn(username, password) {
  const user = findUser(username);
  if (user !== undefined) {
    if (user.password === password) {
      user.loggedIn = true;
      return "ok";
    }
    return "passwordWrong";
  }
  return "usernameWrong";
}

// Log out the user
function logOut(usernane) {
  const user = findUser(username);
  if (user !== undefined) {
    user.loggedIn = false;
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
    FileSystem.writeFileSync('userInfo.json', newData, finished);
  }
  return "userExist";
}

// Removes a user
function removeUser(username) {
  delete users[username];
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

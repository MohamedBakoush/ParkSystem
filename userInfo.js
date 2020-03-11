'use strict';

const FileSystem = require('fs');
const data = FileSystem.readFileSync('userInfo.json');
const users = JSON.parse(data);

// Finds a user by username
function findUser(id){
 if (users[id] === undefined) {
         console.log("undefined");
   return undefined;
 }
 else {
   console.log("all good");
   return "Exist";
 }

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
    console.log(users);
    FileSystem.writeFileSync('userInfo.json', newData, finished);
    function  finished(err){
      console.log("all set.");
    }
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

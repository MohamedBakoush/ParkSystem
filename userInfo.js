'use strict';

const fs = require('fs');
const data = fs.readFileSync('userInfo.json');
const users = JSON.parse(data);

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
  // if (findUser(username) === null) {
    let newData;
    newData = {
      username: username,
      password,
      forename,
      surname,
      email,
      phoneNum,
      loggedIn: false,
    };
    users.push(newData);
    fs.writeFileSync('userInfo.json', JSON.stringify(users, null, 2), Finished);
    function Finished(err) {
      console.log('all set');
    }
  // }
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

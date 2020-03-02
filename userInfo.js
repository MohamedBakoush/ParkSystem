'use strict';

let users = [
  {
    username: "aaec"
  }

];

function findUser(username){
  for (const user of users) {
    if (user.username === username) {
      return user;
    }
  }
  return null;
}

function addUser(username, password, forename, surname, email, phoneNum) {
  if (findUser(username) === null) {
    const newUser = {
      username: username,
      password,
      forename,
      surname,
      email,
      phoneNum
    };
    users = [newUser, ...users.slice(0)];
    return newUser;
  }
}

// This is a test function to see all of the users in the object
function getAllUsers() {
  return users;
}

module.exports = {
  addUser,
  getAllUsers,
};

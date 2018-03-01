const User = require('../../models/user');
const log = require('../../logger/index')(module);


module.exports = (userFields) => {
  let user = {
    firstName: userFields.firstName,
    lastName: userFields.lastName,
    patronymic: userFields.patronymic,
    email: userFields.email,
    password: userFields.password,
    type: userFields.type,
  };

  let newUser = new User(user);
  return new Promise((resolve, reject) => {
    newUser.save((err, newUser) => {
      if (err) {
        log.error(err);
        reject(err);
      }
      resolve(newUser);
    });
  });
};
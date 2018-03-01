const User = require('../../models/user');
const log = require('../../logger/index')(module);

module.exports = (id, values) => {
  return new Promise((resolve, reject) => {
    User.findOne({_id: id}, values, (err, user) => {
      if (err) {
        log.error(err);
        reject(err);
      }
      resolve(user);
    });
  });
};
const User = require('../../models/user');
const log = require('../../logger/index')(module);


module.exports = async (login, password) => {
  try {
    let user = await User.findOne({login: login});
    if (user && user.checkPassword(password)) {
      return user;
    } else {
      return false;
    }
  } catch(err) {
    log.error(err);
    return false;
  }
};
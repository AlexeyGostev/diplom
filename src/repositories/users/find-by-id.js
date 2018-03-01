const User = require('../../models/user');
const log = require('../../logger/index')(module);

module.exports = async (id) => {
  try {
    return await User.findById(id);
  } catch(err) {
    log.error(err);
    throw err;
  }
};
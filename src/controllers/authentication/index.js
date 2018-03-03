const checkPassword = require('./check-password');
const checkToken = require('./check-token');
const refreshToken = require('./refresh-token');

module.exports = {
  checkPassword: checkPassword,
  checkToken: checkToken,
  refreshToken: refreshToken

};
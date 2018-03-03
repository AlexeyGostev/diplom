const updateTokenRecord = require('./update-token-record');
const findByAccessToken = require('./find-by-accessToken');
const findByRefreshToken = require('./find-by-refreshToken');

module.exports = {
  updateTokenRecord: updateTokenRecord,
  findByAccessToken: findByAccessToken,
  findByRefreshToken: findByRefreshToken
};
const TokensStorage = require('../../models/tokensStorage');
const log = require('../../logger/index')(module);


module.exports = async (refreshToken) => {
  try {
    return await TokensStorage.findOne({refreshToken: refreshToken});
  } catch(err) {
    log.error(err);
    throw err;
  }
};
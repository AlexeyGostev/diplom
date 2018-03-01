const TokensStorage = require('../../models/tokensStorage');
const log = require('../../logger/index')(module);


module.exports = async (accessToken) => {
  try {
    return await TokensStorage.findOne({accessToken: accessToken});
  } catch(err) {
    log.error(err);
    throw err;
  }
};
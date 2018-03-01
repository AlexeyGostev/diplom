const TokensStorage = require('../../models/tokensStorage');
const log = require('../../logger/index')(module);


module.exports = async (options) => {
  try {
    let tokenRecord = await TokensStorage.findOne({userId: options.userId});
    if (tokenRecord) {
      tokenRecord.accessToken = options.accessToken;
      tokenRecord.refreshToken = options.refreshToken;
      tokenRecord.createAt = Date.now();
    } else {
      console.log(1);
      tokenRecord = new TokensStorage(options);
    }
    return await tokenRecord.save();
  } catch(err) {
    log.error(err);
    throw err;
  }
};
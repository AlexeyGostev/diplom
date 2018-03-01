const userRepository = require('../../repositories/users');
const tokensStorage = require('../../repositories/tokensStorage');
const ResponseJson = require('../libs/reponseJson');
const config = require('../../config/index');
const log = require('../../logger/index')(module);

const descriptionsConstants = require('../constants/descriptions');
const errorCodes = require('../constants/errorCodes');


module.exports = async (req, res, next) => {
  try {
    let rj = new ResponseJson();
    let at = req.body.accessToken;
    let accessLifeTime = config.get('tokens:accessLifeTime');
    let tokenRecord;
    let user;

    tokenRecord = tokensStorage.findByAccessToken(at);
    if (!tokenRecord) {
      rj.setAll(400, descriptionsConstants.WRONG_TOKEN, errorCodes.WRONG_TOKEN);
      return res.status(rj.status).json(rj);
    }
    if ((new Date(tokenRecord.createAt + accessLifeTime)) < Date.now()) {
      rj.setAll(401, descriptionsConstants.TOKEN_FOUL, errorCodes.TOKEN_FOUL);
      return res.status(rj.status).json(rj);
    }
    user = await userRepository.findById(tokenRecord.userId);
    if (!user) {
      rj.setAll(400, descriptionsConstants.USER_IS_MISSING, errorCodes.USER_IS_MISSING);
      return res.status(rj.status).json(rj);
    }
    req.custom.userId = user._id;
    next();
  } catch (err) {
    log.error(err);
    next(500);
  }
};
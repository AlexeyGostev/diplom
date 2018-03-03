const userRepository = require('../../repositories/users');
const tokensStorage = require('../../repositories/tokensStorage');
const ResponseJson = require('../libs/reponseJson');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const log = require('../../logger/index')(module);

const descriptionsConstants = require('../constants/descriptions');
const errorCodes = require('../constants/errorCodes');


module.exports = async (req, res, next) => {
  try {
    let rj = new ResponseJson();
    let rt = req.body.refreshToken;
    let at;
    let refreshLifeTime = config.get('tokens:refreshLifeTime');
    let accessSecret = config.get('tokens:accessSecret');
    let refreshSecret = config.get('tokens:refreshSecret');
    let tokenRecord;
    let user;
    let payload;
    let dateFoul;

    tokenRecord = await tokensStorage.findByRefreshToken(rt);
    if (!tokenRecord) {
      rj.setAll(401, descriptionsConstants.WRONG_TOKEN, errorCodes.WRONG_TOKEN);
      return res.status(rj.status).json(rj);
    }
    dateFoul = +(new Date((+tokenRecord.createAt + refreshLifeTime)));
    if (dateFoul < Date.now()) {
      rj.setAll(401, descriptionsConstants.TOKEN_FOUL, errorCodes.TOKEN_FOUL);
      return res.status(rj.status).json(rj);
    }
    user = await userRepository.findById(tokenRecord.userId);
    if (!user) {
      rj.setAll(400, descriptionsConstants.WRONG_REFRESH_TOKEN, errorCodes.WRONG_REFRESH_TOKEN);
      return res.status(rj.status).json(rj);
    }
    payload = {
      id: user._id.toString()
    };
    at = jwt.sign(payload, accessSecret);
    rt = jwt.sign(payload, refreshSecret);
    tokenRecord = await tokensStorage.updateTokenRecord({
      userId: user._id,
      accessToken: at,
      refreshToken: rt
    });
    rj.setDescription(descriptionsConstants.TOKEN_WAS_REFRESH);
    rj.set('userId', user._id.toString());
    rj.set('accessToken', tokenRecord.accessToken);
    rj.set('refreshToken', tokenRecord.refreshToken);
    rj.set('createAt', tokenRecord.createAt);
    return res.status(rj.status).json(rj);
  } catch (err) {
    log.error(err);
    next(500);
  }
};
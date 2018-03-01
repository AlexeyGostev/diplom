const userRepository = require('../../repositories/users');
const tokensStorage = require('../../repositories/tokensStorage');
const ResponseJson = require('../libs/reponseJson');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const log = require('../../logger/index')(module);

const descriptionsConstants = require('../constants/descriptions');
const errorCodes = require('../constants/errorCodes');


module.exports = async (req, res, next) => {
  try {
    let rj = new ResponseJson();
    let login = req.body.login;
    let password = req.body.password;
    let at; // access token
    let rt; // refresh token
    let payload; // body of jwt
    let refreshSecret = config.get('tokens:refreshSecret');
    let accessSecret = config.get('tokens:accessSecret');
    let tokenRecord;

    let user = await userRepository.checkPassword(login, password);
    if (!user) {
      rj.setAll(400, descriptionsConstants.WRONG_LOGIN_OR_PASS, errorCodes.WRONG_LOGIN_OR_PASS);
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

    // Хорошо бы зашифровать бы посильнее токены
    rj.set('userId', user._id.toString());
    rj.set('accessToken', tokenRecord.accessToken);
    rj.set('refreshToken', tokenRecord.refreshToken);
    rj.set('createAt', tokenRecord.createAt);
    rj.setDescription(descriptionsConstants.USER_WAS_LOGIN);
    return res.status(rj.status).json(rj);
  } catch (err) {
    log.error(err);
    next(500);
  }
};
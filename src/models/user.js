const crypto = require('crypto');

const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  patronymic: {
    type: String,
    default: ''
  },
  login: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default : ''
  },
  salt: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'user'
  }
}, { usePushEach: true });

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = crypto.randomBytes(32).toString('base64');
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._plainPassword;
  });

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('User', schema);


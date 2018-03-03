const mongoose = require('mongoose');
const config = require('../config/index');

let uri = process.env.NODE_ENV === 'test' ? config.get('mongoose:uri:test') : config.get('mongoose:uri:production');
mongoose.connect(uri, config.get('mongoose:options'));

mongoose.Promise = Promise;

module.exports = mongoose;
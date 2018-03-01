const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  createAt: {
    type: Schema.Types.Date,
    default: Date.now()
  }
}, { usePushEach: true });

module.exports = mongoose.model('TokensStorage', schema);


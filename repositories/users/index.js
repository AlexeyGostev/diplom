const User = require('../../models/user');
const insertOneUser = require('./insert-one-user');
const selectOneUser = require('./select-one-user');


module.exports = {
  insertOneUser: insertOneUser,
  selectOneUser: selectOneUser
};
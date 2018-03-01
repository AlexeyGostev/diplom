const User = require('../../models/user');
const insertOneUser = require('./insert-one-user');
const selectOneUser = require('./select-one-user');
const checkPassword = require('./check-password');
const findById = require('./find-by-id');

module.exports = {
  insertOneUser: insertOneUser,
  selectOneUser: selectOneUser,
  checkPassword: checkPassword
};
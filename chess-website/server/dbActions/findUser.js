const users = require('../models/user');
const validator = require('validator');

module.exports = async (email) => {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }
  email = validator.normalizeEmail(email);
  return await users.findOne({'email': email});
};

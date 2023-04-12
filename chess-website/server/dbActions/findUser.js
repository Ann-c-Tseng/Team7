const users = require('../models/user')

module.exports = async (email) => {
    return await users.findOne({"email": email});
}
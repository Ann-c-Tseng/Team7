const signUpTemplateCopy = require('../models/SignUp')

module.exports = async (email) => {
    return await signUpTemplateCopy.findOne({"email": email});
}
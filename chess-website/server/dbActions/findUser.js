const signUpTemplateCopy = require('../models/SignUpModels')

module.exports = async (email) => {
    return await signUpTemplateCopy.findOne({"email": email});
}
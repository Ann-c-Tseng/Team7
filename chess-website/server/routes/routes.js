const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response) => {
    const saltPassword = await bcrypt.genSalt(10) //encrypt password before sending to DB
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password:securePassword
    })
    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

router.post('/login', (request, response) => {
    let InputEmail = request.body.email;
    let InputPassword = request.body.password;

    //Search the DB for an entry
    signUpTemplateCopy.findOne({"email": InputEmail})
    .then(data => {
        if(!data) {
            console.log("invalid email");
            response.json(false) 
        } else {
            
            bcrypt.compare(InputPassword, data.password, function(err, result) {
                if (result) {
                    // password is valid
                    console.log("logged in");
                    //TODO: Session tokens to more reliably check authentication

                    const body = {
                        fullName: data.fullName,
                        username: data.username,
                        email: data.email,
                        success: true,
                        message: "Successfully logged in.",
                    }

                    response.json(body);
                } else {
                    // password is invalid
                    console.log("invalid password");
                    response.json(false);
                }
            });
        }
    })
    .catch(error => response.json(error))
});

module.exports = router;
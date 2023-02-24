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

//Still figuring out GET with email entry matching db...
router.post('/login', (request, response) => {
    //1. Grab input email from user input field, and check mongodb for user info if found
    //2. Remember that password is hashed so must compare with input password (unhashed)
    //to see if password authentication is/isn't correct.
    //3. Return json response boolean based on result.

    let InputEmail = request.body.email;
    let InputPassword = request.body.password;
    console.log(InputEmail);
    console.log(InputPassword);
    response.send({email: InputEmail, pass: InputPassword});
    /*signUpTemplateCopy.find({"email": InputEmail})
    .then(data => {
        const retrievedUserInfo = data[0];

        if(isObjEmpty(retrievedUserInfo)) {
            response.json(false)
            console.log("hello");
        } else {
            //Otherwise, we did fine someone and we need to check password.
            //...Check if InputPassword and db stored hashed password matches  
            //using bcrypt compare function
            bcrypt.compare(InputPassword, retrievedUserInfo.password, function(err, result) {
                if (result) {
                    // password is valid
                    response.json(true)
                } else {
                    // password is invalid
                    response.json(false)
                }
            });
        }
    })
    .catch(error => response.json(error))*/
});

module.exports = router;
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
router.get('/login/', (request, response) => {
    //1. Grab input email from user input field, and check mongodb for user info if found
    //2. Remember that password is hashed so must compare with input password (unhashed)
    //to see if password authentication is/isn't correct.
    //3. Return json response boolean based on result.

    var InputEmail = request.body.email;
    var InputPassword = request.body.password;

    signUpTemplateCopy.find({"email": InputEmail})
    .then(data => {
        const retrievedUserInfo = data[0];
        console.log("data retrieved: " + retrievedUserInfo);
        // console.log("retrieved password: " + retrievedUserInfo.password)
        // console.log("user input password: " + InputPassword)
    
        //If retrievedUserInfo equals {}, that means we did not 
        //find any user in DB with that email. 
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
    .catch(error => response.json(error))
});

module.exports = router;
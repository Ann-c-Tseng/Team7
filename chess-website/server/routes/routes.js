const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const gameModel = require('../models/Games')
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

//Use POST when not submitting data via query string in the URL.
router.post('/login', (request, response) => {
    //1. Grab input email from user input field, and check mongodb for user info if found
    //2. Remember that password is hashed so must compare with input password (unhashed)
    //to see if password authentication is/isn't correct.
    //3. Return json response boolean based on result.
    let InputEmail = request.body.email;
    let InputPassword = request.body.password;

    //Search the DB for an entry
    signUpTemplateCopy.findOne({"email": InputEmail})
    .then(data => {
        if(!data) {
            console.log("invalid email");
            response.json(false) //invalid email
        } else {
            console.log(data);
            //Otherwise, we did fine someone and we need to check password.
            //...Check if InputPassword and db stored hashed password matches  
            //using bcrypt compare function
            
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
                    response.json(false)
                }
            });
        }
    })
    .catch(error => response.json(error))
});

router.post('/history', async (request, response) => {
    let user = request.body.username;
    const games = await gameModel.find({$or: [{black: user}, {white: user}]}).exec();
    response.json(games);
})

router.post('/leaderboard', async (request, response) => {
    const users = await signUpTemplateCopy.find({elo: {$gt: 0}}).exec();
    response.json(users);
})

module.exports = router;
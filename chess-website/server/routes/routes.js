const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const findUser = require("../dbActions/findUser");
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response, next) => {
    const saltPassword = await bcrypt.genSalt(10) //encrypt password before sending to DB
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const userData = await findUser(request.body.email);

    if (userData){
        response.json({
            message: "User with email already exists.",
            success: false
        });
        return next();
    }

    //Saved into DB
    const signedUpUser = new signUpTemplateCopy({
        fullName:request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password:securePassword,
    })

    try{
        let result = await signedUpUser.save();

        response.json({
            username: request.body.username,
            email: request.body.email,
            message: "Successfully signed up",
            success: true
        });
        return next();
    }
    catch(error){
        console.log(error);
    }
})

router.post('/login', async (request, response, next) => {
    let InputEmail = request.body.email;
    let InputPassword = request.body.password;

    try{
        const userData = await await findUser(InputEmail);
        
        //Check email
        if(!userData) {
            console.log("invalid email");
            response.json(false);
            return next();
        }

        //Check password
        const passwordMatch = await bcrypt.compare(InputPassword, userData.password)
        if (!passwordMatch) {
            console.log("invalid password");
            response.json(false);
            return next();
        }

        //TODO: Session tokens to more reliably check authentication

        //Send back to user
        const body = {
            fullName: userData.fullName,
            username: userData.username,
            email: userData.email,
            success: true,
            message: "Successfully logged in.",
        }

        response.json(body);
    }
    catch(error){
        console.log(error);
    }
    
});

module.exports = router;
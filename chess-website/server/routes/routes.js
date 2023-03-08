const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')
const gameModel = require('../models/Games')
const findUser = require("../dbActions/findUser");
const bcrypt = require('bcrypt')
const validator = require("validator");

const gameManager = require("../chess/gameManager");

router.post('/signup', async (request, response, next) => {
    const saltPassword = await bcrypt.genSalt(10) //encrypt password before sending to DB
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const userData = await findUser(request.body.email);

    if (userData){
        response.json({
            message: "Account already exists",
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

        if (!validator.isAlphanumeric(request.body.fullName) || 
        !validator.isAlphanumeric(request.body.username) ||
        !validator.isEmail(request.body.email) ||
        request.body.password.length < 8){
            throw new Error("Data validation failed!");
        }

        let result = await signedUpUser.save();

        response.json({
            username: request.body.username,
            email: request.body.email,
            message: "Successfully signed up",
            success: true
        });
        
    }
    catch(error){
        response.json({
            message: "Data validation failed.",
            success: false
        });
        console.log(error);
        return next();
    }
    return next();
})

router.post('/login', async (request, response, next) => {
    let inputEmail = request.body.email;
    let inputPassword = request.body.password;

    try{
        if (!validator.isEmail(inputEmail)){
            throw new Error("Invalid email");
        }

        const userData = await findUser(inputEmail);
        
        //Check email
        if(!userData) {
            throw new Error("Invalid email");
        }

        //Check password
        const passwordMatch = await bcrypt.compare(inputPassword, userData.password)
        if (!passwordMatch) {
            throw new Error("Invalid password");
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
        response.json({
            message: "Failed to log in",
            success: false
        });
        console.log(error);
        return next();
    }
    return next();
});

router.post('/profile', async (request, response, next) => {
    let InputEmail = request.body.email;

    try{
        const userData = await findUser(InputEmail);
        
        //Check email
        if(!userData) {
            console.log("invalid email");
            response.json(false);
            return next();
        }

        //Send back to user
        const body = {
            elo: userData.elo,
            id: userData._id,
            fullName: userData.fullName,
            username: userData.username,
            email: userData.email,
            success: true,
            message: "Successfully received profile data.",
        }

        response.json(body);
    }
    catch(error){
        console.log(error);
    }
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
router.post('/spectate', async (request, response) => {
    response.json({
        success: true,
        message: "Retrieved games",
        games: gameManager.getActiveGames(),
    });
})

module.exports = router;
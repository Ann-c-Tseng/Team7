const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    fullName: {
        type:String, 
        require: true,
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    elo:{
        type:Number,
        default:1000,
        required:true
    },
}, {versionKey: false})

module.exports = mongoose.model('userCreationTable', signUpTemplate)
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type:String, 
        require: true,
        minLength: 3,
        maxLength: 30,
    },
    username:{
        type:String,
        required:true,
        minLength: 3,
        maxLength: 30,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    elo:{
        type:Number,
        default:1000,
        required:true,
    },
}, {versionKey: false})

module.exports = mongoose.model('users', userSchema)
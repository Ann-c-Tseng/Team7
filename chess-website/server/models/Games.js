const mongoose = require('mongoose');

const game = new mongoose.Schema({
    moveStringWhite: {
        type: String,
        required: true,
    },
    moveStringBlack: {
        type: String,
        required: true
    },
    numMoves: {
        type: Number,
        required: true,
    },
    black: {
        type: String,
        required: true,
    },
    white: {
        type: String,
        required: true,
    },
    winner: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default:Date.now
        // required: true,
    },
    duration: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('games', game)
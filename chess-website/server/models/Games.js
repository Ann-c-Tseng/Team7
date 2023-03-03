const mongoose = require('mongoose');

const game = new mongoose.Schema({
    moveString: {
        type: String,
        required: true,
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
        required: true,
    }
})

module.exports = mongoose.model('games', game);
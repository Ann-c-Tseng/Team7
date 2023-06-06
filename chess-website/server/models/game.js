const mongoose = require('mongoose');

const game = new mongoose.Schema({
  pgn: {
    type: String,
    required: true,
  },
  fen: {
    type: String,
    required: true,
  },
  moves: {
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
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
}, {versionKey: false});

module.exports = mongoose.model('games', game);

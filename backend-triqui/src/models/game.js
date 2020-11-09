const mongoose = require("mongoose");
//const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let gameSchema = new Schema({
  started: {
    type: Number,
    default: 0,
    required: true,
  },
  name: {
    type: String,
  },

  field: {
    type: [],
  },

  ganador: {
    type: String,
  },
});

module.exports = mongoose.model("Game", gameSchema);

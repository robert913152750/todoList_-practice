const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todo2Schema = new Schema({
  name: {
    type: String,
    require: true
  },
  done: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Todo", todo2Schema);

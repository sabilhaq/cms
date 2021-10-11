const { Schema, model } = require("mongoose");

const dataSchema = Schema(
  {
    letter: String,
    frequency: Number,
  }
);

module.exports = model("Data", dataSchema);

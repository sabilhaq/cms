const { Schema, model } = require("mongoose");

const datadateSchema = Schema(
  {
    letter: Date,
    frequency: Number,
  }
);

module.exports = model("Datadate", datadateSchema);

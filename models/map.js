const { Schema, model } = require("mongoose");

const mapSchema = Schema(
  {
    title: String,
    lat: Number,
    lng: Number,
  }
);

module.exports = model("Map", mapSchema);

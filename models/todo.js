const { Schema, model } = require("mongoose");

const todoSchema = Schema(
  {
    title: String,
    complete: {
      type: Boolean,
      default: false,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Todo", todoSchema);

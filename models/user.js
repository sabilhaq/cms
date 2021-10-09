const bcrypt = require("bcrypt");
const salt = 10;

const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    email: String,
    password: String,
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.modified) this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.methods.verify = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model("User", userSchema);

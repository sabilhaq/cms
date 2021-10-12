const bcrypt = require("bcrypt");
const salt = 10;

const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    email: String,
    password: String,
    token: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  if (this._update.password) {
    this._update.password = bcrypt.hashSync(this._update.password, salt);
  }
  next();
});

userSchema.methods.verify = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = model("User", userSchema);

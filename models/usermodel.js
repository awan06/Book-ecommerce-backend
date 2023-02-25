const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password to secure your account"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
  },
});

const User = mongoose.model("User", userSchema);
userSchema.methods.matchPassword = function (enteredPassword) {
  return enteredPassword === this.password;
};
module.exports = User;

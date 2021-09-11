const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Min password length is 6 characters"],
  },
});

// UserSchema.post("save", function (doc, next) {
//   console.log("new user was created and saved", doc); // doc is the document obj after the user is saved in the db
//   next();
// });

// no doc here because this is executed before the user is created .
UserSchema.pre("save", async function (next) {
  //generate a salt
  const salt = await bcrypt.genSalt(10);
  // this.password = local version or the plain text password that the user provides
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;

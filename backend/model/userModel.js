const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// to do later
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.signup = async function (username, email, password) {
  // validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough, you must have atleast an uppercase character, a lowercase character, a number and a symbol."
    );
  }

  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });

  if (emailExists) {
    throw Error("Email already in use!");
  }

  if (usernameExists) {
    throw Error("Username already in use!");
  }

  // mypassword
  const salt = await bcrypt.genSalt(15);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (usernameOrEmail, password) {
  if (!usernameOrEmail || !password) {
    throw Error("All fields must be filled");
  }

  const emailExists = await this.findOne({ email: usernameOrEmail });
  const usernameExists = await this.findOne({ username: usernameOrEmail });

  if (!emailExists && !usernameExists) {
    throw Error("There are no accounts registered with this username / email!");
  }

  let user;

  emailExists ? (user = emailExists) : (user = usernameExists);

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password!");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_STRING, { expiresIn: "3d" });
};

const controller = {
  // login controller
  loginUser: async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
      const user = await User.login(usernameOrEmail, password);

      // create a token
      const token = createToken(user._id);

      res
        .status(200)
        .json({ username: user.username, email: user.email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // signup controller
  signupUser: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const user = await User.signup(username, email.toLowerCase(), password);

      // create a token
      const token = createToken(user._id);

      res.status(200).json({ username, email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = controller;

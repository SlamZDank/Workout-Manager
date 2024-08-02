const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const requireAuth = async (req, res, next) => {
  // verify the user login
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ Error: "Authorization token required!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_STRING);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ Error: "Request is not authorized: not a valid TOKEN" });
  }
};

module.exports = requireAuth;

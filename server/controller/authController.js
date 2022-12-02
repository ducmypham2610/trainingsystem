const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const generateToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log(username,password);
    const user = await User.findOne({ username}).select('+password');
    const isCorrectPassword = await user.comparePassword(password);
    if (!user || !isCorrectPassword) {
      return res.status(204).json({
        status: "UNAUTHORIZED",
        message: "Invalid username or password ! Please try again.",
      });
    }
    const token = jwt.sign({ user }, username, {
      expiresIn: 60 * 24,
    });
    return res.status(200).json({
      status: "success",
      token,
      user,
    });
  };
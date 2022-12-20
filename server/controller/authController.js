const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ _id:id }, process.env.JWT_SECRET, {
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
    status: "Logged in successful",
    token,
    data: {
      user,
    },
  });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  const user = await User.findOne({ username }).select("+password");
  const isCorrectPassword = await user.comparePassword(password);
  if (!user || !isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }
  generateToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError(
        "You are not logged in! Please log in to get access to this.",
        401
      )
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded)

  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token is no longer available",
        401
      )
    );
  }

  req.user = currentUser;
  next();
};

exports.restrictedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

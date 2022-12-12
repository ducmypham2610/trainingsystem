const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.addUser = async (req, res, next) => {
  const {username, email} = req.body;

  const usernameDuplicated = await User.findOne({username});
  const emailDuplicated = await User.findOne({email});

  if(usernameDuplicated || emailDuplicated) {
    return res.status(404).send('Username or email is already taken ! Please try again.')
  }

  const newUser = await User.create(req.body);
  return res.status(201).json({
    status: "success",
    newUser,
  });
};

exports.updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) {
    console.log("no user");
    return;
  }
  console.log(user);
  return res.status(200).json({
    status: "success",
    user,
  });
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(204).json({
      status: "No content",
    });
  }

  return res.status(200).json({
    status: "Deleted successfully !",
  });
};

exports.getById = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findById(id);
  if (!user) {
    return res.status(204).json({
      status: "No content",
    });
  }

  return res.status(200).json({
    status: "success",
    user,
  });
};

// exports.search = async (req, res, next) => {
//   const email = req.params.email;
//   const users = await User.findOne({email});
//   return res.status(200).json({
//     status: "success",
//     users,
//   });
// };

exports.getAll = async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({
    status: "success",
    users,
  });
};


exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username,password);
  const user = await User.findOne({ username});
  if (!user) {
    return res.status(404).send('Invalid username or password ! Please try again.')
  }
  const isCorrectPassword = await user.comparePassword(password);
  if(!isCorrectPassword) {
    return res.status(404).send('Invalid username or password ! Please try again.')
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

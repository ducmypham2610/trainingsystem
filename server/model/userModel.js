const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 12;
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
  },
  password: {
    type: String,
  },
  telephone: {
    type: String,
  },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  topics:[{type:Schema.Types.ObjectId, ref:"Topic"}]
},{
  timestamps: true
});

userSchema.methods.comparePassword = function(_password) {
  return bcrypt.compareSync(_password, this.password);
}

userSchema.pre('save', async function (next) {
  // Only run this function if the password was actully modified
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password,salt);
    return next();
  } catch(err) {
    return next(err);
  }
});

userSchema.pre(/^find/, function (next) {
  this.populate({ path: "courses", select: "name description" });
  this.populate({path:'topics',select: "name description"})
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

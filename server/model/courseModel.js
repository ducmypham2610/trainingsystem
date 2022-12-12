const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId, ref: "Category"
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre(/^find/, function (next) {
    this.populate({path:'category', select: "name"});
    next();
})

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

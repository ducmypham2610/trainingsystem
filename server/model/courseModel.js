const mongoose = require('mongoose');
const {Schema} = mongoose;

const courseSchema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim:true,
    },
    category: {
            type:String,
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
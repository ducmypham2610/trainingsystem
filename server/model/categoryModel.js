const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = new Schema({
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
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
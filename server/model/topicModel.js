const mongoose = require('mongoose');
const {Schema} = mongoose;

const topicSchema = new Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
        trim: true,
    },
    course:{
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    }
})

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
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
        type: Schema.Types.ObjectId,
        ref:'Course'
    },
    description: {
        type: String,
        trim: true,
    }
})

topicSchema.pre(/^find/, function (next) {
    this.populate({ path: "course", select: "name description" });
    next();
  });

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
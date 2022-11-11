const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    id: {
        type:String
    },
    name: {
        type: String,
        trim:true,
        maxLength:[25,'Must be less than 20 characters'],
    },
    email: {
        type: String,
        trim:true,
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
        enum:['man','woman','undefined'],
    },
    address: {
        type: String
    },
    role: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);


module.exports = User;
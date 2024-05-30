const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String
    },
    profileImg: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/128/1144/1144760.png'
    }
})

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')
const {Schema} = mongoose

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timeStamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    thumbnail: {
        type: String,
        default: 'https://images.pexels.com/photos/8892/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
})

module.exports = mongoose.model('Post', postSchema)
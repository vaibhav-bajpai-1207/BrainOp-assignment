const mongoose = require('mongoose')
const {MONGO_URI} = require('../config/index')

const connectToDB = async ()=>{
    await mongoose.connect(MONGO_URI)
    console.log('Connected to DB')
}

module.exports = connectToDB
const connectToDB = require('./connection')
const mongoose = require('mongoose')

class Repository {
    constructor(){
        connectToDB()
    }

    async getAllPosts(){
        
    }
}

module.exports = Repository
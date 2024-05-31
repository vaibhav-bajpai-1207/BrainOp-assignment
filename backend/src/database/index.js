const connectToDB = require('./connection')
const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require('./models/Post')
const { ApiError } = require('../utils/errorClass')

class Repository {
    constructor(){
        connectToDB()
    }

    //#region POST SECTION

    //#region GET ALL POSTS
    async getAllPosts(){
        try{
            const posts = await Post.find()
            return posts
        }catch(err){
            throw new ApiError('DB error : ' + err.message)
        }
    }
    //#endregion

    //#region GET POST BY ID
    async getPostById(postId){
        try{
            const post = await Post.findById(postId)
            return post
        }catch(err){
            throw new ApiError('DB error : ' + err.message)
        }
    }
    //#endregion

    //#region ADD A NEW POST
    async createPost(postObj){
        try{
            const post = new Post(postObj)
            await post.save()
            return post
        }catch(err){
            throw new ApiError('DB error : ' + err.message)
        }
    }
    //#endregion

    //#endregion

    //#region USER SECTION

    //#region GET USER BY QUERY
    async getUserByQuery(query){
        try{
            const response = await User.find(query)
            return response
        }catch(err){
            throw new ApiError('DB error : ' + err.message)
        }
    }
    //#endregion

    //#region GET USER BY USER ID
    async getUserById(userId){
        try{
            const user = await User.findById(userId)
            return user
        }catch(err){
            throw new ApiError('DB error : ' + err.message)
        }
    }
    //#endregion

    //#region CREATE NEW USER
    async createUser(userObj){
        try{
            const user = new User(userObj)
            await user.save()
            return user
        }catch(err){
            throw new ApiError('DB error : ' + err.message)
        }
    }
    //#endregion

    //#endregion
}

module.exports = Repository
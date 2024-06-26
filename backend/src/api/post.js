const express = require('express')
const postRouter = express()
const Service = require('../service/index')
const authenticateUser = require('../../middlewares/authenticate')

const service = new Service()

//#region GET ALL POSTS
postRouter.get('/', authenticateUser, async (req, res)=>{
    try{
        const response = await service.getAllPosts()
        res.json(response.data)
    }catch(error){
        next(error)
    }
})
//#endregion

//#region GET POST BY ID
postRouter.get('/:postId', authenticateUser, async (req, res)=>{
    try{
        const response = await service.getPostById(req.params.postId)
        res.json(response.data)
    }catch(error){
        next(error)
    }
})

//#region CREATE A NEW POST
postRouter.post('/new', authenticateUser, async (req, res, next)=>{
    try{
        const response = await service.createPost(req.body)
        res.json(response.data)
    }catch(error){
        next(error)
    }
})
//#endregion

module.exports = postRouter
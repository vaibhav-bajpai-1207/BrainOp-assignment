const express = require('express')
const postRouter = express()
const Service = require('../service/index')

const service = new Service()

//#region GET ALL POSTS
postRouter.get('/', async (req, res)=>{
    try{
        const response = await service.getAllPosts()
        res.json(response.data)
    }catch(error){
        next(error)
    }
})
//#endregion

//#region CREATE A NEW POST
postRouter.post('/new', async (req, res)=>{
    try{
        const response = await service.createPost(req.body)
        res.json(response.data)
    }catch(error){
        next(error)
    }
})
//#endregion

module.exports = postRouter
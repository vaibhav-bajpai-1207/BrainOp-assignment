const express = require('express')
const userRouter = express()
const Service = require('../service/index')

const service = new Service()

//#region GET ALL USERS
userRouter.get('/', (req, res)=>{
    res.send('all users')
})

//#region GET USER BY ID
userRouter.get('/:userId', async (req, res, next)=>{
    try{
        const response = await service.getUserById(req.params.userId)
        res.status(response.status).json(response.data)
    }catch(err){
        next(err)
    }
})

userRouter.post('/signup', async (req, res, next)=>{
    try{
        const response = await service.createUser(req.body)
        res.status(response.status).json(response.data)
    }catch(err){
        next(err)
    }
})

module.exports = userRouter
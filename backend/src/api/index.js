const express = require('express')
const apiRouter = express()

const user = require('./user')
const post = require('./post')

apiRouter.use('/user', user)
apiRouter.use('/post', post)

apiRouter.get('/', (req, res)=>{
    res.send('Backend running here')
})

module.exports = apiRouter
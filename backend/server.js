const express = require('express')
const {PORT} = require('./src/config/index')
const api = require('./src/api/index')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', api)

//#region ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next)=>{
    const status = error.status || 500
    const message = error.message
    return res.status(status).json({message: message})
})
//#endregion

app.listen(PORT, ()=> console.log(`Backend running at http://localhost:${PORT}`))
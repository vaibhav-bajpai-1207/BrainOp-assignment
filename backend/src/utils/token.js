const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/index')

async function generateToken(payload, expiry){
    const token = await jwt.sign(
        {data: payload},
        JWT_SECRET,
        {expiresIn: expiry}
    )

    return token
}

async function generateToken(payload){
    const token = await jwt.sign(
        {data: payload},
        JWT_SECRET
    )
    return token
}

async function verifyToken(token){
    let decoded = await jwt.verify(token, JWT_SECRET)
    return decoded.data
}

module.exports = {generateToken, verifyToken}
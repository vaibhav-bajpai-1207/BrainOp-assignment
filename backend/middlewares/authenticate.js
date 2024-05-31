const { AuthorisationError, ApiError } = require('../src/utils/errorClass')
const { verifyToken } = require('../src/utils/token')

const authenticateUser = async (req, res, next)=> {
    try{
        const token = req.cookies.token
    if(!token) throw new AuthorisationError('API Error : Token not found')

    const userId = await verifyToken(token)
    if(!userId) throw new AuthorisationError('API Error : Token invalid')
    
    req.userId = userId
    next()
    }catch(err){
        if (err instanceof AuthorisationError) throw err
        else throw new ApiError('Api Error : ' + err.message)
    }
}

module.exports = authenticateUser
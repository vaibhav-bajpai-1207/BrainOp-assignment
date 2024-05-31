const Repository = require('../database/index')
const RequestResponse = require('../utils/ResponseClass')
const { ApiError, ValidationError, NotFoundError } = require('../utils/errorClass')
const { generateToken } = require('../utils/token')

class Service {
    constructor() {
        this.repo = new Repository()
    }

    //#region USER SECTION

    //#region CREATE NEW USER
    async createUser({email, password, fname, lname, profileImg}){
        try{
            if(!email || email === '') {
                throw new ValidationError('Service Error : email not provided')
            }
            if(!password || password === '') {
                throw new ValidationError('Service Error : password not provided')
            }
            if(!fname || fname === '') {
                throw new ValidationError('Service Error : first name not provided')
            }
            
            const userObj = {email, password, fname, lname, profileImg}    
            const newUser = await this.repo.createUser(userObj)

            return new RequestResponse(newUser)
        }catch(err){
            if (err instanceof ApiError || err instanceof ValidationError) throw err
            throw new ApiError('Service Error : ' + err.message)
        }
    }
    //#endregion

    //#region GET USER BY USERID
    async getUserById(userId){
        try{
            if(!userId || userId === '') {
                throw new ValidationError('Service Error : id not provided')
            }
            
            const user = await this.repo.getUserById(userId)
            if(!user) {
                throw new NotFoundError('Service Error : User with given id not found')
            }
            return new RequestResponse(user)
        }catch(err){
            if (err instanceof ApiError || err instanceof ValidationError || err instanceof NotFoundError) {
                throw err
            }
            throw new ApiError('Service Error : ' + err.message)
        }
    }
    //#endregion

    //#region LOGIN USER
    async loginUser({email, password}){
        try{
            if(!email || email === '') {
                throw new ValidationError('Service Error : email not provided')
            }
            if(!password || password === '') {
                throw new ValidationError('Service Error : password not provided')
            }

            const response = await this.repo.getUserByQuery({email: email})
            const user = response[0]

            if(!user){
                throw new NotFoundError('Service Error : User with given email not found')
            }
            
            if(user.password !== password){
                throw new ValidationError('Service Error : password is incorrect')
            }

            const token = await generateToken(user._id)

            const responseObj = {
                id: user._id,
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                profileImg: user.profileImg,
                token: token
            }
            
            return new RequestResponse(responseObj)
        }catch(err){
            if (err instanceof ApiError || err instanceof ValidationError || err instanceof NotFoundError) {
                throw err
            }
            throw new ApiError('Service Error : ' + err.message)
        }
    }
    //#endregion

    //#endregion

    //#region POST SECTION

    //#region GET ALL POSTS
    async getAllPosts(){
        try{
            const posts = await this.repo.getAllPosts()
            return new RequestResponse(posts)
        }catch(err){
            if(err instanceof ApiError) throw err
            throw new ApiError('Service Error : ' + err.message)
        }
    }
    //#endregion

    //#region GET POST BY ID
        async getPostById(postId){
            try {
                const post = await this.repo.getPostById(postId)
                return new RequestResponse(post)
            } catch (error) {
                if (err instanceof ApiError || err instanceof ValidationError || err instanceof NotFoundError) {
                    throw err
                }
                throw new ApiError('Service Error : ' + err.message)
            }
        }
    //#endregion

    //#region CREATE A NEW POST
    async createPost({title, desc, author, thumbnail}){
        try{
            if(!title || title === '') {
                throw new ValidationError('Service Error : title not provided')
            }
            if(!desc || desc === '') {
                throw new ValidationError('Service Error : Description not provided')
            }
            if(!author || author === '') {
                throw new ValidationError('Service Error : author not provided')
            }

            const postObj = {title, desc, author}
            const post = await this.repo.createPost(postObj)

            return new RequestResponse(post)
        }
        catch(err){
            if (err instanceof ApiError || err instanceof ValidationError || err instanceof NotFoundError) {
                throw err
            }
            throw new ApiError('Service Error : ' + err.message)
        }
    }
    //#endregion

    //#endregion
}

module.exports = Service
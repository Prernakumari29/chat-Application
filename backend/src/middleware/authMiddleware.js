const jwt = require("jsonwebtoken")
const apiError = require("../utils/apiError")
const UserModel = require("../models/userModel")

const authMiddleware = async(req,res,next)=>{
    try {
        let accessToken = req.cookies.accessToken

        if(!accessToken){
            throw new apiError(401, "unauthorized credentials")
        }

        let decode = jwt.verify(accessToken , process.env.ACCESSTOKEN)

        let user = await UserModel.findById(decode.id).select("-password")

        if(!user){
            throw new apiError(404 ,"user not found")
        }
        req.user = user;
        next();


    } catch (error) {
        next(error);
    }

}
module.exports = authMiddleware;
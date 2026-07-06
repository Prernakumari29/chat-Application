const jwt = require("jsonwebtoken");

const generateAccessToken = (userId)=>{
   return  jwt.sign({id:userId} , process.env.ACCESSTOKEN , {expiresIn:"15m"} )
}

const generateRefreshToken = (userId)=>{
  return jwt.sign({id:userId} , process.env.REFRESHTOKEN , {expiresIn:"1d"})
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}
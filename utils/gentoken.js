const jwt=require("jsonwebtoken")

const gentoken=(user)=>{
    
return jwt.sign({email:user.email,id:user._id},process.env.JWT_KEY)
}
module.exports.gentoken=gentoken;
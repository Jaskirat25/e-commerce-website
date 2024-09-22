const express=require("express");
const router=express.Router()
const User=require("../models/owner-model")
const bcrypt=require("bcrypt")
router.get("/",(req,res)=>{
    res.send("hi");
});
router.post("/register",(req,res)=>{
    
    try{
        bcrypt.genSalt(10,(err,salt)=>{
bcrypt.hash(password,salt, async (err,hash)=>{
if(err)return res.status(500).send(err.message);
else{
    let{fullname,password,email}= req.body;
    const Createduser= await User.create({
        fullname,
        email,
        password:hash
    })

    }
})
      })
}catch(err){
    res.status(500).send(err.message);
}
    
});



module.exports=router;
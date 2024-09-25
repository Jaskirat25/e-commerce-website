const express=require("express");
const router=express.Router()

const User=require("../models/user-model.js")
router.get("/",(req,res)=>{
    res.send("hdkfsjdfsi");
});

if(process.env.NODE_ENV==="development"){
    router.post("/create", async (req,res)=>{
        const users= await User.find();
        // if(users.length>0){
        //   return  res.status(201).send("you cant create a new user")
        // }
      let  {username,password,email}=req.body;
const created= await User.create({
username,
email,
password
})
res.status(200).send(created);
    })
};


module.exports=router;
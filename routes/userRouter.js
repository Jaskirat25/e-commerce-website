// const express=require("express");
// const router=express.Router()
// const{gentoken}=require("../utils/gentoken")
// const User=require("../models/owner-model")
// const bcrypt=require("bcrypt")
// router.get("/",(req,res)=>{
//     res.send("hi");
// });
// router.post("/register",(req,res)=>{
    
//     try{
//         let{username,password,email}= req.body;
//         bcrypt.genSalt(10,(err,salt)=>{
// bcrypt.hash(password,salt, async (err,hash)=>{
// if(err)return res.status(500).send(err.message);
// else{
//     const Createduser= await User.create({
//         username,
//         email,
//         password:hash
//     })
//     const token = gentoken(Createduser);
//     res.cookie("token",token);
//    console.log(token);
//     }
// })
//       })
// }catch(err){
//     res.status(500).send(err.message);
// }
    
// });



// module.exports=router;
const express = require("express");
const router = express.Router();
const {registereduser,loginuser,logout}=require("../controllers/authcontroller")
// const app = express();
// app.use(express.urlencoded({ extended: true })); 
router.get("/create", (req, res) => {
  
    res.render("admin");
});

router.post("/register", registereduser);

router.post("/login",loginuser);

router.post("/logout",logout);
module.exports = router;

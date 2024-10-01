const express=require("express")
const productmodel=require("../models/product-model")
const router=express.Router();
const { isloggedin }=require("../middlewares/isloggedin")
const Users=require("../models/user-model");
const userModel = require("../models/user-model");
router.get("/",(req,res)=>{
res.render("firstpage")
})

router.get("/cart/:id",isloggedin, async (req,res)=>{
   const user= await Users.findOne({email:req.user.email});
   user.cart.push(req.params.id);
  await user.save();
    res.redirect("/userRoute/shop");
})


module.exports=router;


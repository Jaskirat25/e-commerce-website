const express=require("express")
const productmodel=require("../models/product-model")
const router=express.Router();
const { isloggedin }=require("../middlewares/isloggedin")
const User=require("../models/user-model");

router.get("/",(req,res)=>{
res.render("firstpage")
})

router.get("/cart/:id",isloggedin, async (req,res)=>{
   const user= await User.findOne({email:req.user.email});
   user.cart.push(req.params.id);
  await user.save();
    res.redirect("/userRoute/shop");
})
router.get("/cart", isloggedin,async (req, res) => {
  const user= await User.findOne({email:req.user.email}).populate("cart");
  let sum=0;
user.cart.forEach(function(p){
  sum+=p.price;
})
let totalsum=sum+20;
     res.render("cart",{user,sum,totalsum});
 });

module.exports=router;


const express=require("express")
const productmodel=require("../models/product-model")
const router=express.Router();
const { isloggedin }=require("../middlewares/isloggedin")
const User=require("../models/user-model");
const paymentController=require("../controllers/paymentController")
router.get("/",(req,res)=>{
res.render("firstpage")
})

router.get("/cart/:id",isloggedin, async (req,res)=>{
  let {id}=req.params;
   const user= await User.findOne({email:req.user.email});
  const i= await user.cart.some(item=>String(item._id)===id)
  if(!i){
    user.cart.push(id);
    await user.save();
    res.redirect("/userRoute/shop");
}
   else  res.redirect("/cart");  
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
router.get('/checkout', (req, res) => {
  res.render('product', { amount: 1500});
});
router.get('/', paymentController.renderProductPage);
router.post('/createOrder', paymentController.createOrder);

module.exports=router;


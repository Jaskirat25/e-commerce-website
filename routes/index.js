const express=require("express")

const router=express.Router();
const loggedin=require("../middlewares/isloggedin")

router.get("/",(req,res)=>{
 const show=true;
    res.render("index",{show:false});
})
router.get("/shop",loggedin,(req,res)=>{
    
    res.render("shop");
})

module.exports=router;


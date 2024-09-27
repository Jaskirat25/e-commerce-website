const express=require("express")

const router=express.Router();
const loggedin=require("../middlewares/isloggedin")

router.get("/",(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error});
})
router.get("/shop",loggedin,(req,res)=>{
    
    res.render("shop");
})
module.exports=router;


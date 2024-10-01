
const express = require("express");
const router = express.Router();

const {registereduser,loginuser,logout}=require("../controllers/authcontroller");
const { isloggedin } = require("../middlewares/isloggedin");
const productmodel=require("../models/product-model")





router.get("/", (req, res) => {
  
    res.render("index",{show:true});
});
router.get("/cart", isloggedin,(req, res) => {
  
    res.render("cart");
});
router.get("/shop", async (req, res) => {
    const products=await productmodel.find();
 res.render("shop",{products});
});



router.post("/register", registereduser);

router.post("/login",loginuser);

router.post("/logout",logout);
module.exports = router;

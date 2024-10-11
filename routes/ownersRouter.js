const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const Owner = require("../models/owners-model.js");
const Product = require("../models/product-model.js");
router.get("/", (req, res) => {
  res.render("owner-login",{show:true})
});
router.get("/admin", async (req, res) => {
 const p= await Owner.findOne({email:"jas@j.com"}).populate("cart");
res.render("admin", { products:p.cart });

});
router.get("/products", (req, res) => {
  res.render("createproducts")
});
router.post("/delete/:id", async  (req, res) => {
  const deleted=await Product.findOneAndDelete({_id:req.params.id})
  res.redirect("/ownerRoute/admin")
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const users = await Owner.find();
    if (users.length > 0) {
      return res.status(201).send("you cant create a new user");
    }
    let { username, password, email } = req.body;
    const created = await Owner.create({
      username,
      email,
      password,
    });
    res.status(200).send(created);
  });
}

router.post("/check",(req,res)=>{
let{password}=req.body;
if(password==process.env.CODE){
  res.render("createproducts")
}else res.redirect("/");
});
router.get("/deleteAll",(req,res)=>{
  
    res.send(`
        <img src="/images/image.png" alt="Delete All Warning" style="width: 600px;">
    `);

});
router.get("/edit/:id", async (req,res)=>{
const product=await Product.findOne({_id:req.params.id});
res.render("admin-edit",{product});
});
router.post("/edit/:id", upload.single('image'),async (req,res)=>{
let{price,discount,bgcolor,panelcolor,textcolor}=req.body;

const updated={
  price,discount,bgcolor,panelcolor,textcolor
}
if(req.file){
  updated.image=req.file.buffer;
}

const p=await Product.findOneAndUpdate({_id:req.params.id},updated);
res.redirect("/ownerRoute/admin");
});


module.exports = router;

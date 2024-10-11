const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Product = require("../models/product-model");
const Owner = require("../models/owners-model");
router.post("/create", upload.single("image"), async (req, res) => {
 try{ 
  let { name, price, discount, bgcolor, textcolor, panelcolor } = req.body;

  const product = await Product.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    textcolor,
    panelcolor,
  });
const owner=await Owner.findOne({email:"jas@j.com"});
  owner.cart.push(product._id);
  await owner.save();
  res.redirect("/ownerRoute/admin");
}
catch(err){
  console.log(err.message);
}
});
router.post("/cart", async (req, res) => {
 
});

module.exports = router;

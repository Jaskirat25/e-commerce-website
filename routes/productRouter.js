const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const Product = require("../models/product-model");
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
  res.send(product);
}
catch(err){
  console.log(err.message);
}
});

module.exports = router;

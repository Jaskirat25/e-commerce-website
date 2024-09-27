const express = require("express");
const router = express.Router();
const multer = require("../config/multer");
const Product = require("../models/product-model");
router.post("/create", multer.single("image"), async (req, res) => {
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
});

module.exports = router;

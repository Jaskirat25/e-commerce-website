const express = require("express");
const router = express.Router();

const User = require("../models/owners-model.js");
router.get("/", (req, res) => {
  res.render("owner-login",{show:true})
});
router.get("/admin", (req, res) => {
  res.render("admin")
});
router.get("/products", (req, res) => {
  res.render("createproducts")
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const users = await User.find();
    if (users.length > 0) {
      return res.status(201).send("you cant create a new user");
    }
    let { username, password, email } = req.body;
    const created = await User.create({
      username,
      email,
      password,
    });
    res.status(200).send(created);
  });
}
// router.get("/create",(req,res)=>{
//   res.render("createproducts")
// });

router.post("/check",(req,res)=>{
let{password}=req.body;
if(password==process.env.CODE){
  res.render("createproducts")
}else res.redirect("/");
});

module.exports = router;

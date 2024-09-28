const { gentoken } = require("../utils/gentoken");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const registereduser = async function (req, res) {
  try {
    const { fullname, password, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("error", "You have already registered");
      return res.redirect("/register"); // Redirect with flash message
    }

    // Input validation
    if (!fullname || !password || !email) {
      req.flash("error", "All fields are required");
      return res.redirect("/register");
    }

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ fullname, email, password: hashedPassword });

    // Generate token and set cookie
    const token = gentoken(newUser);
    res.cookie("token", token);

    // Set success flash message
    req.flash("success", "Registration successful! Please log in.");

    // Redirect to login or shop page with flash message
    res.redirect("/shop"); // or res.render('shop', { token });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong. Please try again.");
    res.status(500).redirect("/register");
  }
};


const loginuser=async function(req,res){
try{
const{email,password}=req.body;
const u=await User.findOne({email});
if(!u)return res.send("wrong email or password");

    bcrypt.compare(password,u.password,(err,result)=>{
if(result){const token=gentoken(u);
    res.cookie("token",token);
    req.flash("success","login successfull")
    return res.render("owner-login")}
else return res.send("wrong password");
    })
    }
    catch(err){
        return res.send(err.message);
    }
}
const logout=async function(req,res){
req.cookie("token","");
res.redirect("/");
}
module.exports={registereduser,loginuser,logout};

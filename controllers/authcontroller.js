const { gentoken } = require("../utils/gentoken");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const registereduser = async function (req, res) {
  try {
    const { fullname, password, email } = req.body;

  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    
      return res.send("You have already registered"); 
    }

    
    if (!fullname || !password || !email) {

      return res.send("all fields are required");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({ fullname, email, password: hashedPassword });
    const token = gentoken(newUser);
    res.cookie("token", token);

   res.redirect('/userRoute/shop');
  } catch (err) {
    console.error(err);
   
    res.status(500).send("error");
  }
};


const loginuser=async function(req,res){
try{
const{email,password}=req.body;
const u=await User.findOne({email});
if(!u)return res.send("wrong email or password");

    bcrypt.compare(password,u.password,(err,result)=>{
if(result){
  const token=gentoken(u);
 
    res.cookie("token",token);
 
    return res.redirect("shop")}
else return res.send("wrong password");
    })
    }
    catch(err){
        return res.send(err.message);
    }
}
const logout=async function(req,res){
  res.cookie("token","");
res.redirect("/");
}
module.exports={registereduser,loginuser,logout};

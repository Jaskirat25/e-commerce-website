const { gentoken } = require("../utils/gentoken");
const User = require("../models/owner-model");
const bcrypt = require("bcrypt");

const registereduser=async function (req, res){
    try {
        const { username, password, email } = req.body;
       const u= await User.findOne({email})
if(u)return res.status(401).send("you have already registered");
        // Check if required fields are provided
        if (!username || !password || !email) {
            return res.status(400).send("All fields are required");
        }

        // Generate salt and hash password asynchronously
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user in the database
        const createdUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = gentoken(createdUser);

        // Set token in cookie
        res.cookie("token", token);

        // Send a response with success status and the token
        res.status(201).send({ message: "User registered successfully", token });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
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
    return res.send("you can login")}
else return res.send("wrong password");
    })
    }
    catch(err){
        return res.send(err.message);
    }
}
module.exports={registereduser,loginuser};

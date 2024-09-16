const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce");

const userSchema=mongoose.Schema({

})

module.exports=mongoose.models("UserSchema",userSchema);
const mongoose= require("mongoose");
const product=require("../models/product-model")
const user=mongoose.Schema({
    fullname:{
   type:String,
required:true,

    },
    password:
    {
        type:String,
    required:true,
minlength:8
},

    email:{
        type:String,
        required:true
    },
    cart:[{
type:mongoose.Schema.Types.ObjectId,
ref: product,
default:[]

}]  
})

module.exports=mongoose.model('user',user);



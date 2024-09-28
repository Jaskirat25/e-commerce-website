const mongoose= require("mongoose");

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
    }
})

module.exports=mongoose.model('user',user);



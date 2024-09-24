const mongoose= require("mongoose");

const user=mongoose.Schema({
    username:{
   type:String,
required:true,
minlength:3
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



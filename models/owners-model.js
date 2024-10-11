const mongoose = require("mongoose");
const product=require("../models/product-model")
const ownerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: String,
  password: String,
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
   ref:product,
   default:[]
  }],
 
});

module.exports = mongoose.model("Owner", ownerSchema);

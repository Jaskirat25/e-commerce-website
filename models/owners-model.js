const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: String,
  password: String,
  products: {
    type: [String],
    default: [],
  },
  gst: String,
});

module.exports = mongoose.model("User", ownerSchema);

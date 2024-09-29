const jwt = require("jsonwebtoken");
const User = require("../models/owners-model");
const isloggedin = async function (req, res, next) {
  if (!req.cookies.token) {
    
    return res.redirect("/");
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await User.findOne({ email: decoded.email }).select("-password");
    req.user = user;
    next();
  } catch (err) {
    req.flash("you need to login first");
    return res.redirect("/");
  }
};
module.exports = { isloggedin };

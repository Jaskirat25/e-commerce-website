const express = require("express")
const app = express();
const cookie=require("cookie-parser");
const path=require("path");
const db=require("./config/mongoose")
require('dotenv').config();
const  expressSession=require("express-session")
const flash=require("connect-flash");
const userRouter=require("./routes/userRouter")
const productRouter=require("./routes/productRouter")
const ownerRouter=require("./routes/ownersRouter")
const index=require("./routes/index");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie())
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.use("/",index);
app.use("/userRoute",userRouter);
app.use("/productRoute",productRouter);
app.use("/ownerRoute",ownerRouter);

app.use(expressSession({
    resave:false,
    saveUninitialized:true,
    secret:process.env.EXPRESS_SESSION_SECRET,
}))
app.use(flash());



app.listen("3000");
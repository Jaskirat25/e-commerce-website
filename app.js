const express = require("express")
const app = express();
const cookie=require("cookie-parser");
const path=require("path");
const db=require("./config/mongoose")
require('dotenv').config();

const userRouter=require("./routes/userRouter")
const productRouter=require("./routes/productRouter")
const ownerRouter=require("./routes/ownerRouter")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie())
app.use(express.static(path.join(__dirname,"public")));

app.use("/userRoute",userRouter);
app.use("/productRoute",productRouter);
app.use("/ownerRoute",ownerRouter);


app.get("/",(req,res)=>{
    res.send("hlo");
})
app.listen("3000");
const express = require("express")
const app = express();

const cookie=require("cookie-parser");
const path=require("path");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie())
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.send("hlo");
})
app.listen("3000");
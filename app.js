//jshint esversion:6

const express = require("express");
const bodyparser = require("body-parser");

const app = express();
let items = [" Fuy Food ", "Cook Food ", "Eat Food"];
let workitem = [];

app.set("view engine" , "ejs");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/" , function(req , res){

   let today = new Date();
   let options ={
    weekday : "long" ,
    day : "numeric" ,
    month : "long"

   };
   let day = today.toLocaleDateString("en-US" , options);

   res.render("list" , {listTitle : day , newlistitem : items});

});
app.post("/" , function(req,res){

    let item = req.body.newitem;

   if (req.body.list == "work"){
    workitem.push(item);
    res.redirect("/work");
   }else{
    items.push(item);
    res.redirect("/");

   }
 
});


app.get("/work" , function(req , res){
    res.render("list" , {listTitle : "work list" , newlistitem : workitem});
});
app.get("/about" , function(req ,res){
res.render("about");
});

app.listen(3000 , function(){
    console.log("server is running on port 3000.");
});
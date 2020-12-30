const express = require("express");

const bodyParser = require("body-parser");

const app = express();
var items=["buy food","cook","eat"];
var workItems=[];
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"))

app.get("/",function(req,res){
    let today = new Date();
    let options={
         weekday : "long" ,
         day : "numeric",
         month : "long",

    };
    let day = today.toLocaleDateString("en-US",options);
    
    res.render("list",
    {listTitle : day , newListItems : items}
    );
});
app.post("/",function(req,res){
    var item = req.body.newItem;
    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
 
});

app.get("/work",function(req,res){
    res.render("list",{listTitle : "Work Title" ,  newListItems : workItems})
})

app.get("/about",function(req,res){
    res.render("about");
})

app.listen(3000,function(){
 console.log("Server started");
}); 

app.post("/work",function(req,res){
    var item = req.body.newItem;
    workItems.push(item);
  res.redirect("/work");
});
const express = require("express");
const bodyParser = require("body-parser");
const date = require( __dirname + "/date.js");

console.log(date);

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items =[];
var workItems = [];

app.get("/", function(req,res) {

  const day = date.getDay();

  res.render("list", {listItems: day, itemsx: items});


  app.post("/", function(req,res) {
    var it = req.body.newItem;

    if(req.body.list === "Work") {
      workItems.push(it);
      res.redirect("/work");
    } else {
      items.push(it);
      res.redirect("/");
    };
  });
});

app.get("/work", function(req,res) {
  res.render("list", {listItems: "Work List", itemsx: workItems});

  app.post("/work", function(req,res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
  });
});

app.listen(process.env.PORT || 3000 , function() {
  console.log("Server is running on port 3000");
});

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items =[];
app.get("/", function(req,res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", {kindOfDay: day, itemsx: items});


  app.post("/", function(req,res) {
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
  });


  // console.log(today.getDay());

});

app.listen(process.env.PORT || 3000 , function() {
  console.log("Server is running on port 3000");
});

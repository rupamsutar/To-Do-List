const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name:String
};

const Item = mongoose.model("item", itemsSchema);

const item1 = new Item({
  name: "Hit the GYM"
});

const item2 = new Item({
  name: "Take a Bath"
});

const item3 = new Item({
  name: "Intake Protien"
});

const defaultItems = [item1, item2, item3];





app.get("/", function(req,res) {

  Item.find({}, function(err, items) {

    if (items.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added items to the DB");
        };
      });
      res.redirect("/");
    } else {
      res.render("list", {listItems: "Today", itemsx: items})
    };
  });



  app.post("/", function(req,res) {

    const  itemName = req.body.newItem;

    const item = new Item ({
      name: itemName
    });

    item.save();

    res.redirect("/");
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

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://rupamsutar:RupamSutar@cluster0.j8hppcl.mongodb.net/todolistDB");

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

//the code for any todo list page to appear on the screen ************

const listSchema = {
  name:String,
  items: [itemsSchema]
};

const List = mongoose.model("list", listSchema)

//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
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
});
//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

app.post("/delete", function(req,res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully deleted the checked item. ID : " + checkedItemId)
        res.redirect("/");
      };
    });
  } else {
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}}, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/" + listName);
      };
    });
  };
});


app.get("/:customListName", function(req,res) {
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err,foundList) {
    if (err) {
      console.log(err);
    } else {
      if (foundList) {
        res.render("list", {listItems: customListName, itemsx: foundList.items})
      } else {
        const list = new List ({
          name: customListName,
          items: []
        });
        list.save();
        res.redirect("/" + customListName)
      }
    }
  });
});

app.post("/", function(req,res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item ({
    name: itemName
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err,foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName)
    });
  }

});






// ********************************************************

app.listen(process.env.PORT || 3000 , function() {
  console.log("Server is running on port 3000");
});

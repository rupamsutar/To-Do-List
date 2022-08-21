const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.get("/", function(req,res) {

  var today = new Date();
  var day = "";
  if(today.getDay() === 0 ) {
    day = "Sunday";
  } else if(today.getDay() === 1) {
    day = "Monday";
  } else if(today.getDay() === 2) {
    day = "Tuesday";
  } else if(today.getDay() === 3 ) {
    day = "Wednesday";
  } else if(today.getDay() === 4 ) {
    day = "Thrusday";
  } else if(today.getDay() === 5 ) {
    day = "Friday";
  } else if(today.getDay() === 6 ) {
    day = "Saturday";
  } else {
    day = "SorryDay"
  }

  res.render("list", {kindOfDay: day});


  // console.log(today.getDay());

});

app.listen(process.env.PORT || 3000 , function() {
  console.log("Server is running on port 3000");
});

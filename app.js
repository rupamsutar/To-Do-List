const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req,res) {

  var today = new Date();
  if(today.getDay() === 6 || today.getDay() === 0) {
    res.send("Hey its a weekend ! Enjoy !");
  } else {
    res.send("you have to work");
  }


  // console.log(today.getDay());

});

app.listen(process.env.PORT || 3000 , function() {
  console.log("Server is running on port 3000");
});

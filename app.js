const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


//parse application
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')

app.get("/", (req, res) => {

  var today = new Date();
  var currentDay = today.getDay();

  var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var day = weekDays[currentDay];

  if(currentDay ===  6 || currentDay ===  0){
    day = weekDays
    res.write("<h1>Its weekend</h1>");
  } else {
    res.render('list', {kinfOfDay: day});
  }

});


app.listen(port, () => {
  console.log("Server is running on port " + port);
});

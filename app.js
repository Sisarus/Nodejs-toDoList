const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//parse application
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')

// To do Items

var items = [];


app.get("/", (req, res) => {

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-GB", options);

  res.render('list', {kinfOfDay: day, newListItems: items});
});

app.post('/', (req, res)=> {
  var item = req.body.newItem;

  items.push(item);
  
  res.redirect("/");
});


app.listen(port, () => {
  console.log("Server is running on port " + port);
});

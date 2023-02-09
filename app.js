const express = require("express");
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
const port = 3000;

//parse application
app.use(bodyParser.urlencoded({extended: true}));
// Express use local files in public
app.use(express.static("public"));

app.set('view engine', 'ejs')

// To do Items

var items = [];
var workItems = [];


app.get("/", (req, res) => {

  var day = date.getDate();

  res.render('list', {listTitle: day, newListItems: items});
});

app.post('/', (req, res)=> {
  var item = req.body.newItem;

  if(req.body.list === "Work"){
    if(item.length != 0){
      workItems.push(item);
    }
    res.redirect("/work");
  } else{
    if(item.length != 0){
      items.push(item);
    }
    res.redirect("/");
  }
});

app.post("/del", (req, res)=>{
  var deleteItem = req.body.del;

  if(req.body.list === "Work"){
    workItems.splice(deleteItem, 1);
    res.redirect("/work");
  } else {
    items.splice(deleteItem, 1);
    res.redirect("/");
  }
});

app.get("/about", (req, res)=>{
  res.render('about');
});

app.get("/work", (req, res) => {
  res.render('list', {listTitle: "Work List", newListItems: workItems});
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

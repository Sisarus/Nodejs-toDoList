const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

mongoose.set('strictQuery', true);

const app = express();
const port = 3000;

//parse application
app.use(bodyParser.urlencoded({extended: true}));
// Express use local files in public
app.use(express.static('public'));

app.set('view engine', 'ejs')

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {useNewUrlParser: true});

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);

//Default data
const coffee = new Item({name: "Drink Coffee"});
const dance = new Item({name: "Go dance"});
const ama = new Item({name: "Get Ama"});
const defaultItems = [coffee, dance, ama];

// Custom todo list 
const listSchema = {
  name: String,
  items: [itemSchema]
};

// For creating custom todo models 
const List = mongoose.model('List', listSchema);

Item.insertMany(defaultItems, (err)=> {
  if(err){
    console.log(err);
  } else{
    console.log("Successfully saved default items to DB.");
  }
});

// get base todo list
app.get("/", (req, res) => {

  Item.find({}, (err, foundItems)=> {

    if(foundItems.length === 0) {
      Item.insertMany(defaultItems, (err)=> {
        if(err){
          console.log(err);
        } else{
          console.log("Successfully saved default items to DB.");
        }
      });
    } else {
      res.render('list', {listTitle: "Today", newListItems: foundItems});
    }
  });
});

// post new todo task
app.post('/', (req, res)=> {
  var itemName = req.body.newItem;
  var listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  console.log(listName + " " + itemName)

  if(listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, foundList)=>{
      if(!err){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      }
    });
  }
});

// Delete todo task
app.post("/delete", (req, res)=> {
  var checkedItemID = req.body.checkbox;
  var listName = req.body.listName;

  if(listName === "Today") {
    Item.findByIdAndDelete(checkedItemID, (err)=>{
      if(!err){
        res.redirect("/");
      }
    });
  } else {
    List.findOne({name:listName}, function(err, foundList){
      if(!err){
        foundList.items.pull({ _id: checkedItemID });

        foundList.save();

        res.redirect("/" + listName);
      }
    });
  }

});

// creates custom list
app.get('/:customListName', (req, res)=> {
  const customListName = _.capitalize(req.params.customListName);

  // Check if list exist
  List.findOne({name: customListName}, (err, foundList)=>{
    if(!err){
      if(!foundList){
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems //add default data
        });

        list.save();
        res.redirect('/' + customListName);
      } else{
        //Show an existing list
        res.render('list', {listTitle: foundList.name, newListItems: foundList.items})
      }
    }
  })

});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

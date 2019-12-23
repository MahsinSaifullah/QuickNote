//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

let items = [
  {
    key: Date.now(),
    text: 'welcome to QuickNote',
    complete: false,
  },
];

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: true, credentials: true}));


app.get('/items', function(req, res) {
  res.json(items);
});

app.post('/items', function(req, res) {

  const itemKey = req.body.key;
  const itemText = req.body.text;
  const itemComplete = req.body.complete;

  const data = {
    key: itemKey,
    text: itemText,
    complete: itemComplete
  }

  items.push(data);
  console.log(items);
});

app.delete('/items/:key', function(req, res) {
  const key = req.params.key;
  items = items.filter(item => item.key !== key);
  console.log("Delete is requested");
  console.log(key);
  console.log(items);
});

app.put('/items/:key', function(req, res) {
  const key = req.params.key;
  items.forEach(function(item){
    if (item.key === key){
      item.complete = req.body.complete;
    }
  })

  console.log("Put is requested");
  console.log(items);
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}

app.listen(port, function() {
  console.log('Server has started Successfully');
});

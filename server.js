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
  items.push(req.body);
});

app.delete('/items/:key', function(req, res) {
  const key = req.params.key;
  items = items.filter(item => items.key !== key);
});

app.put('/items/:key', function(req, res) {
  const key = req.params.key;
  items.forEach(function(item){
    if (item.key === key){
      item.complete = true;
    }
  })
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 3000;
}

app.listen(port, function() {
  console.log('Server has started Successfully');
});

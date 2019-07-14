require('./models/db');
const usersController = require('./controllers/usersController');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
var hbs = require('express-hbs');

var app = express();
app.use(bodyparser.urlencoded({
  extended:true
}));

app.use(bodyparser.json());
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/views/layouts/mainLayout',
    layoutsDir: __dirname + '/views/layouts'
  }));
  app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views/'));
app.listen(3000, ()=>{
    console.log('Express Server started at port :3000');
})
app.use('/users',usersController);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UsersDB', {useNewUrlParser: true}, (err) => {
    if(!err){ console.log("MongoDB connection success"); }
    else{ console.log("MongoDB connection Fail"); }
});

require('./users.model');
require('./roles.model');
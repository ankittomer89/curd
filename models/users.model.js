const mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: 'Full Name is Required'
    },
    email:{
        type: String,
        required: 'Email is Required'
    },
    mobile:{
        type: String,
        required: 'Mobile is Required'
    },
    rolesId:{
        type: String,
        required: 'Role Id is required'
    },
    city:{
        type: String,
        required: 'City is Required'
    }
    
});

mongoose.model('Users', usersSchema);
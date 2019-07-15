const mongoose = require('mongoose');

var rolesSchema = new mongoose.Schema({
    rolesName: {
        type: String,
        required: 'Full Name is Required'
    },
    rolesId: {
        type: String,
        required: 'id is require'
    },
    userId: {
        type: String,
        required: 'USer Id is require'
    }
});

mongoose.model('Roles', rolesSchema);
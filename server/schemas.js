const mongoose = require('mongoose');


const User = mongoose.model('User', {
    username: String,
    email: String,
    posts: Array,
    createdAt: Date,
    updatedAt: Date
});





module.exports  = {User}
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = mongoose.model('User', new Schema({
  username: String,
  email: String,
  posts: Array,
  createdAt: Date,
  updatedAt: Date
  })
);





module.exports  = {User};

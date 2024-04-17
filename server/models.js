const mongoose = require('mongoose');
// const findOrCreate = require('mongoose-findorcreate');
mongoose.plugin(require('mongoose-findorcreate'))

require('dotenv').config();

const Schema = mongoose.Schema;

const uri = process.env.MONGODB_URI; // make sure to put this variable in your .env file

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDb');
  })
  .catch((error) => {
    console.error('Error while connecting to MongoDB.');
  });

const userSchema = new Schema({
  // username: { type: String, unique: true, required: true},
  email: { type: String, unique: true },
  posts: Array,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const postSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User'},
  url: { type: String, required: true },
});

// userSchema.plugin(findOrCreate);
// postSchema.plugin(findOrCreate);
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);



module.exports  = { User, Post };

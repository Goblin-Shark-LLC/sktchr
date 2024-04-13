
const mongoose = require('mongoose');
const { User, Post } = require('./models');


const createUser = (req, res) => {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send
            return;
        }
        res.status(201).send(user);
    }
    )
}

// test case for createUser


module.exports = {createUser, createPost, getUser, getPost, getAllUsers, getAllPosts, updateUser, updatePost, deleteUser, deletePost};
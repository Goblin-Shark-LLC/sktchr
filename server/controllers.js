
const mongoose = require('mongoose');
const { User, Post } = require('./models');

const userController = {};

userController.createUser = async (req, res, next) => {
    console.log("req.body ===> ", req.body);
    const { email } = req.body;
    const newUser = new User({ email });
    console.log("new user ===> ", newUser);
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send({ error: 'Error creating user' })
            return;
        }
        res.status(201).send(user);
    }
    )
    return next();
}

// test case for createUser


module.exports = userController;
    //createPost, getUser, getPost, getAllUsers, getAllPosts, updateUser, updatePost, deleteUser, deletePost};
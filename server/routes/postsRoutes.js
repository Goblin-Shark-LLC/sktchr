const express = require('express');
const postsConstroller = require('../postsController/posts.js');

const router = express.Router();

router.post('/upload', postsConstroller.upload, postsConstroller.addToDb, (req, res) => {
    return res.sendStatus(200);
});

router.get('/getPosts', postsConstroller.getPosts, (req, res) => {
    res.status(200).send(res.locals.postsArr);
})


module.exports = router;
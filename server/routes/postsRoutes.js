const express = require('express');
const postsConstroller = require('../postsController/posts.js');

const router = express.Router();

router.post('/upload', postsConstroller.upload, postsConstroller.addToDb, (req, res) => {
    return res.sendStatus(200);
});


module.exports = router;
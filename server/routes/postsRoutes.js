const express = require('express');
const fs = require('fs');

const router = express.Router();

router.post('/upload', (req, res, next) => {
    try{
    

    } catch (err) {
        console.log(`Error occurred in upload middleware: ${err}`);
        next({
            message: 'Error occurred in upload middleware.',
            status: 500,
            error: err
        });
    }
});

module.exports = router;
const express = require('express');
const bucket = require('../bucket.js');
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
let nameGen = 0;

router.post('/upload', async (req, res, next) => {
    try{
        // console.log(`req:`, req.body);
    //     fs.writeFile(`imageCache/image${nameGen}.png`, req.body, (err) => {
    //         if(err){
    //             console.error(`An error occurred during image upload: ${err}`);
    //         } else {
    //             console.log('image write success!');
    //         }
    // })
    // bucket.uploadFile(`image${nameGen}.png`, `./imageCache/image${nameGen}.png`);
    nameGen++;
    return next();
    } catch (err) {
        console.log(`Error occurred in upload middleware: ${err}`);
        next({
            message: 'Error occurred in upload middleware.',
            status: 500,
            error: err
        });
    }
}, (req, res) => {
        res.send('uploaded!');
});

module.exports = router;
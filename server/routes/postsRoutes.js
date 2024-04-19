const express = require('express');
const bucket = require('../bucket.js');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')

const router = express.Router();
let nameGen = 0;

const imagePath = path.join(__dirname, '..', 'imgCache', `image${nameGen}.txt`);

router.post('/upload', async (req, res, next) => {
    try{
        // console.log(`req:`, req.body.imgData);
        fs.writeFile(imagePath, req.body.imgData, (err) => {
            if(err){
                console.error(`An error occurred during image upload: ${err}`);
            } else {
                console.log('image write success!');
            }
    })
    bucket.uploadFile(`image${nameGen}.txt`, imagePath);
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
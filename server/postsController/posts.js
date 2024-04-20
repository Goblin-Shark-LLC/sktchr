const fs = require('fs');
const path = require('path');
const util = require('util');
const bucket = require('../bucket.js');
const { User, Post } = require('../models.js');

const postsConstroller = {};

// let nameGen = 0;
// const imagePath = path.join(__dirname, '..', 'imgCache', `image${nameGen}.txt`);

postsConstroller.upload = async (req, res, next) => {
    try{
        res.locals.user = await User.findOne({email: req.cookies['user'].email});
        const nameGen = res.locals.user.posts.length;
        const imagePath = path.join(__dirname, '..', 'imgCache', `image${nameGen}.txt`);

        // console.log(res.locals.user);

        const writeFilePromise = util.promisify(fs.writeFile);
        await writeFilePromise(imagePath, req.body.imgData, (err) => {
            if(err){
                console.error(`An error occurred during image upload: ${err}`);
            } else {
                console.log('image write success!');
            };
    });
        res.locals.img = await bucket.uploadFile(`image${nameGen}.txt`, imagePath);
        return next();
    } catch (err) {
        console.log(`Error occurred in upload middleware: ${err}`);
        next({
            message: 'Error occurred in upload middleware.',
            status: 500,
            error: err
        });
    };
};

postsConstroller.addToDb = async (req, res, next) => {
    try{

        const filter = {email: req.cookies['user'].email};
        const updatedPosts = {posts: [...res.locals.user.posts]};
        updatedPosts.posts.push(res.locals.img.Location)

        console.log('newUserObj', await User.findOneAndUpdate(filter, updatedPosts));
        console.log('newPost:', await Post.create({
            createdBy: res.locals.user,
            url: req.body.imgData
        }))
        return next();
    } catch (error) {
        return next({
            message: "An error occurred in addToDb middleware.",
            status: 500,
            error: error
        })
    };
};

postsConstroller.getPosts = async (req, res, next) => {
    try{
        res.locals.postsArr = await Post.find()
        next();
    } catch(error) {
        next({
            message: 'An error occurred in getPosts middleware.',
            status: 500,
            error: error
        })
    }
}

module.exports = postsConstroller;
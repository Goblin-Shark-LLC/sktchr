const AWS = require('aws-sdk');
const fs = require('fs');

require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

const uploadFile = async (fileName, filePath) => {
    const fileContent = fs.readFileSync(filePath);
    console.log('inside uploadFile')
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: fileContent
    };
    const data = await s3.upload(params).promise();
    // console.log('data', data);
    return data;
};




module.exports = { uploadFile };
require('dotenv').config();
const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = 3000;

const uri = process.env.MONGODB_URI; // make sure to put this variable in your .env file
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/bundle.js'))
})

app.use('*', (req, res) => {
    console.log('404ed');
})

async function connectToMongoDB() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
}

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
    connectToMongoDB();
});

module.exports = app;
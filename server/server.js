const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/bundle.js'))
})

app.use('*', (req, res) => {
    console.log('404ed');
})

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
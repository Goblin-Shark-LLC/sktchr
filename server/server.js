const express = require('express');
const path = require('path');
// const GoogleStrategy = require('./googleStrategy');


const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../build')));

//default endpoint
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/bundle.js'))
})

app.get('/login', (req, res) => {
    res.status(200).send({ok: 'you good'});
})

//update to "feed" once done testing auth
app.get('/protected', (req,res) => {
    res.send('protected page accessed')
})

//404 error handling
app.use((req, res) => res.status(404).send({message:'404ed'}))

//global error handling
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' } 
      };
      const errorObj = Object.assign(defaultErr, err);
      console.log('here\'s the error:', errorObj.log);
      return res.status(errorObj.status).send(errorObj.message);
  });

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
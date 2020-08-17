const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
const baseUrl = `http://localhost:${port}`;


app.get('/', (req, res) => {
   res.status(200).send('hello world!');
});

app.get('/kegs', (req, res) => {
    res.status(200).send('gettin kegs');
});

app.get('/kegs/:kegId', (req, res) => {
    res.status(200).send(`gettin keg ${req.params.kegId}`);
});

// Server
module.exports = app;
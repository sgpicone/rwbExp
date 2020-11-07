const express = require('express');
const app = express();
const cors = require('cors');
const kegCtrl = require('./controllers/kegs');
const configCtrl = require('./controllers/configData');
const port = process.env.PORT || 8000;
const baseUrl = `http://localhost:${port}`;

// var beerQueries = require('./beerQueries');


// connection.connect();
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).send('hello world!');
});

// Kegs

app.get('/kegs', kegCtrl.list);
app.get('/kegs/:kegId', kegCtrl.get);
app.put('/kegs/:kegId', kegCtrl.update);
app.delete('/kegs/:kegId', kegCtrl.delete);
app.post('/kegs', kegCtrl.create);
app.get('/keks/:kegId', kegCtrl.testList);

// Config data
app.get('/config', configCtrl.list);
app.put('/config/trivia', configCtrl.updateTrivia);

// Server
module.exports = app;
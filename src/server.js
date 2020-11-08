const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const cors = require('cors');
const kegCtrl = require('./controllers/kegs');
const configCtrl = require('./controllers/configData');
const metaCtrl = require('./controllers/meta');
const beerCtrl = require('./controllers/beer');
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
app.put('/kegs/:kegId', jsonParser, kegCtrl.update);
app.delete('/kegs/:kegId', kegCtrl.delete);
app.post('/kegs', jsonParser, kegCtrl.create);

// Config data
app.get('/config', configCtrl.list);
app.put('/config/trivia', configCtrl.updateTrivia);

// Beers
app.get('/beers', beerCtrl.list);

// Metadata
app.get('/meta/chemicals', metaCtrl.listChemicals);
app.get('/meta/kegtypes', metaCtrl.listKegTypes);

// Server
module.exports = app;
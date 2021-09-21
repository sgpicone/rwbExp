const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const cors = require('cors');
const kegCtrl = require('./controllers/kegs');
const configCtrl = require('./controllers/configData');
const metaCtrl = require('./controllers/meta');
const beerCtrl = require('./controllers/beer');
const reportCtrl = require('./controllers/reports');
const bulkKegCtrl = require('./controllers/bulkKegs');
const port = process.env.PORT || 8000;
const baseUrl = `http://localhost:${port}`;

app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('hello world!');
});

app.use('/app', express.static(__dirname +'/rwb-admin-master/build/'));

// Kegs

app.get('/kegs', kegCtrl.list);
app.get('/kegs/:kegId', kegCtrl.get);
app.put('/kegs/:kegId', jsonParser, kegCtrl.update);
app.delete('/kegs/:kegId', kegCtrl.delete);
app.post('/kegs', jsonParser, kegCtrl.create);
app.post('/kegs/:kegId/relocate', jsonParser, kegCtrl.relocate);
app.post('/kegs/:kegId/wash', jsonParser, kegCtrl.wash);
app.post('/kegs/:kegId/sani', jsonParser, kegCtrl.sani);
app.post('/kegs/:kegId/fill', jsonParser, kegCtrl.fill);
app.post('/kegs/:kegId/breakdown', jsonParser, kegCtrl.breakdown);
app.post('/kegs/:kegId/issue', jsonParser, kegCtrl.issue);

// Bulk Kegs
app.post('/bulkkegs/relocate', jsonParser, bulkKegCtrl.relocate);
app.post('/bulkkegs/wash', jsonParser, bulkKegCtrl.wash);
app.post('/bulkkegs/sani', jsonParser, bulkKegCtrl.sani);
app.post('/bulkkegs/fill', jsonParser, bulkKegCtrl.fill);
app.post('/bulkkegs/breakdown', jsonParser, bulkKegCtrl.breakdown);

// Info
app.get('/reports/excise_taxes', reportCtrl.exciseTaxes);
app.get('/reports/inventory', reportCtrl.inventory);

// Config data
app.get('/config', configCtrl.list);
app.put('/config/trivia', configCtrl.updateTrivia);

// Beers
app.get('/beers', beerCtrl.list);
app.get('/beers/:beerId', beerCtrl.get);

// Metadata
app.get('/meta/chemicals', metaCtrl.listChemicals);
app.get('/meta/kegtypes', metaCtrl.listKegTypes);

// Server
module.exports = app;
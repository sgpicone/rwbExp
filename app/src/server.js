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

// app.get('/', (req, res) => {
//     res.status(200).send('hello world!');
// });

app.use('/', express.static(__dirname +'/rwb-admin-master/build/'));

// Kegs

app.get('/api/kegs', kegCtrl.list);
app.get('/api/kegs/:kegId', kegCtrl.get);
app.put('/api/kegs/:kegId', jsonParser, kegCtrl.update);
app.delete('/api/kegs/:kegId', kegCtrl.delete);
app.post('/api/kegs', jsonParser, kegCtrl.create);
app.post('/api/kegs/:kegId/relocate', jsonParser, kegCtrl.relocate);
app.post('/api/kegs/:kegId/wash', jsonParser, kegCtrl.wash);
app.post('/api/kegs/:kegId/sani', jsonParser, kegCtrl.sani);
app.post('/api/kegs/:kegId/fill', jsonParser, kegCtrl.fill);
app.post('/api/kegs/:kegId/breakdown', jsonParser, kegCtrl.breakdown);
app.post('/api/kegs/:kegId/issue', jsonParser, kegCtrl.issue);

// Bulk Kegs
app.post('/api/bulkkegs/relocate', jsonParser, bulkKegCtrl.relocate);
app.post('/api/bulkkegs/wash', jsonParser, bulkKegCtrl.wash);
app.post('/api/bulkkegs/sani', jsonParser, bulkKegCtrl.sani);
app.post('/api/bulkkegs/fill', jsonParser, bulkKegCtrl.fill);
app.post('/api/bulkkegs/breakdown', jsonParser, bulkKegCtrl.breakdown);

// Info
app.get('/api/reports/excise_taxes', reportCtrl.exciseTaxes);
app.get('/api/reports/inventory', reportCtrl.inventory);

// Config data
app.get('/api/config', configCtrl.list);
app.put('/api/config/trivia', configCtrl.updateTrivia);

// Beers
app.get('/api/beers', beerCtrl.list);
app.get('/api/beers/:beerId', beerCtrl.get);

// Metadata
app.get('/api/meta/chemicals', metaCtrl.listChemicals);
app.get('/api/meta/kegtypes', metaCtrl.listKegTypes);

// Server
module.exports = app;
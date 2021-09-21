const configQueries = require('../queries/configQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb();

exports.list = async (req, res) => {
    const resp = await configQueries.getConfigData(connection);
    res.status(200).send(resp);
};

exports.updateTrivia = async (req, res) => {
    console.log(req.body);
    const resp = await configQueries.setTriviaUrl(connection, req.body.url);
    res.status(200).send(resp);
};
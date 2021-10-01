const configQueries = require('../queries/configQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);

exports.list = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await configQueries.getConfigData(connection);
    connection.close();
    res.status(200).send(resp);
};

exports.updateTrivia = async (req, res) => {
    var connection = dbFactory.makeDb();
    console.log(req.body);
    const resp = await configQueries.setTriviaUrl(connection, req.body.url);
    connection.close();
    res.status(200).send(resp);
};
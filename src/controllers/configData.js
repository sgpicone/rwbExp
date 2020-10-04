const configQueries = require('../queries/configQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

exports.list = async (req, res) => {
    const resp = await configQueries.getConfigData(connection);
    res.status(200).send(resp);
};

exports.updateTrivia = async (req, res) => {
    console.log(req.body);
    const resp = await configQueries.setTriviaUrl(connection, req.body.url);
    res.status(200).send(resp);
};
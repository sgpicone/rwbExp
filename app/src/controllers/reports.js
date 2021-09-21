const reportQueries = require('../queries/reportQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb();

exports.exciseTaxes = async (req, res) => {
    const resp = await reportQueries.getExciseTaxes(connection, req.query.year);
    res.status(200).send(resp);
};

exports.inventory = async (req, res) => {
    const resp = await reportQueries.getInventory(connection);
    res.status(200).send(resp);
};
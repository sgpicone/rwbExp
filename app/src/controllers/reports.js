const reportQueries = require('../queries/reportQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);


exports.exciseTaxes = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await reportQueries.getExciseTaxes(connection, req.query.year);
    connection.close();
    res.status(200).send(resp);
};

exports.inventory = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await reportQueries.getInventory(connection);
    connection.close();
    res.status(200).send(resp);
};
const metadataQueries = require('../queries/metadataQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);


exports.listKegTypes = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await metadataQueries.getKegTypes(connection);
    connection.close();
    res.status(200).send(resp);
};

exports.listChemicals = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await metadataQueries.getChemicals(connection);
    connection.close();
    res.status(200).send(resp);
};
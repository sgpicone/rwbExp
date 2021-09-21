const metadataQueries = require('../queries/metadataQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb();

exports.listKegTypes = async (req, res) => {
    const resp = await metadataQueries.getKegTypes(connection);
    res.status(200).send(resp);
};

exports.listChemicals = async (req, res) => {
    const resp = await metadataQueries.getChemicals(connection);
    res.status(200).send(resp);
};
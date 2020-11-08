const metadataQueries = require('../queries/metadataQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

exports.listKegTypes = async (req, res) => {
    const resp = await metadataQueries.getKegTypes(connection);
    res.status(200).send(resp);
};

exports.listChemicals = async (req, res) => {
    const resp = await metadataQueries.getChemicals(connection);
    res.status(200).send(resp);
};
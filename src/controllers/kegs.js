const kegQueries = require('../queries/kegQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true
});

exports.list = async (req, res) => {
    const resp = req.query.rwbId ?
        await kegQueries.findKegByRwbId(connection, req.query.rwbId)
        : await kegQueries.getKegs(connection);
    res.status(200).send(resp);
};

exports.get = async (req, res) => {
    const resp = await kegQueries.getKegInfo(connection, req.params.kegId);
    res.status(200).send(resp);
};

exports.update = async (req, res) => {
    console.log(req.body);
    const resp = await kegQueries.updateKegById(connection, req.params.kegId, req.body);
    res.status(200).send(resp);
};

exports.create = async (req, res) => {
    const resp = await kegQueries.createKeg(connection, req.body);
    res.status(204).send(resp);
};

exports.delete = async (req, res) => {
    const resp = await kegQueries.deleteKegById(connection, req.params.kegId);
    res.status(200).send(resp);
};
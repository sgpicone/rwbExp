const kegQueries = require('../queries/kegQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);

exports.list = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = req.query.rwbId ?
        await kegQueries.findKegByRwbId(connection, req.query.rwbId)
        : await kegQueries.getKegs(connection);
    connection.close();
        res.status(200).send(resp);
};

exports.get = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.getKegById(connection, req.params.kegId);
    connection.close();
    res.status(200).send(resp);
};

exports.update = async (req, res) => {
    var connection = dbFactory.makeDb();
    console.log(req.body);
    const resp = await kegQueries.updateKegById(connection, req.params.kegId, req.body);
    connection.close();
    res.status(200).send(resp);
};

exports.create = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.createKeg(connection, req.body);
    connection.close();
    res.status(204).send(resp);
};

exports.delete = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.deleteKegById(connection, req.params.kegId);
    connection.close();
    res.status(200).send(resp);
};

exports.relocate = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.updateKegLocation(connection, req.params.kegId, req.body);
    connection.close();
    res.status(200).send(resp);
};

exports.wash = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.addKegWashLog(connection, req.params.kegId, req.body);
    connection.close();
    res.status(200).send(resp);
};

exports.sani = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.addKegSaniLog(connection, req.params.kegId, req.body);
    connection.close();
    res.status(200).send(resp);
};

exports.fill = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.addKegFillLog(connection, req.params.kegId, req.body);
    connection.close();
    res.status(200).send(resp);
};

exports.breakdown = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.addKegBreakdownLog(connection, req.params.kegId, req.body);
    connection.close();
    res.status(200).send(resp);
};

exports.issue = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await kegQueries.addKegIssue(connection, req.params.kegId, req.body);
    connection.close();
    res.status(200).send(resp);
};


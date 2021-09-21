const kegQueries = require('../queries/kegQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb();

exports.list = async (req, res) => {
    const resp = req.query.rwbId ?
        await kegQueries.findKegByRwbId(connection, req.query.rwbId)
        : await kegQueries.getKegs(connection);
    res.status(200).send(resp);
};

exports.get = async (req, res) => {
    const resp = await kegQueries.getKegById(connection, req.params.kegId);
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

exports.relocate = async (req, res) => {
    const resp = await kegQueries.updateKegLocation(connection, req.params.kegId, req.body);
    res.status(200).send(resp);
}

exports.wash = async (req, res) => {
    const resp = await kegQueries.addKegWashLog(connection, req.params.kegId, req.body);
    res.status(200).send(resp);
}

exports.sani = async (req, res) => {
    const resp = await kegQueries.addKegSaniLog(connection, req.params.kegId, req.body);
    res.status(200).send(resp);
}

exports.fill = async (req, res) => {
    const resp = await kegQueries.addKegFillLog(connection, req.params.kegId, req.body);
    res.status(200).send(resp);
}

exports.breakdown = async (req, res) => {
    const resp = await kegQueries.addKegBreakdownLog(connection, req.params.kegId, req.body);
    res.status(200).send(resp);
}

exports.issue = async (req, res) => {
    const resp = await kegQueries.addKegIssue(connection, req.params.kegId, req.body);
    res.status(200).send(resp);
}


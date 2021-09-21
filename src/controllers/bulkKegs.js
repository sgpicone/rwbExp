const bulkKegQueries = require('../queries/bulkKegQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb();

exports.relocate = async (req, res) => {
    const resp = await bulkKegQueries.bulkUpdateKegLocation(connection, req.body);
    return res.status(204).send(resp);
}
exports.wash = async (req, res) => {
    const resp = await bulkKegQueries.bulkWashKeg(connection, req.body);
    return res.status(204).send(resp);
}
exports.fill = async (req, res) => {
    const resp = await bulkKegQueries.bulkFillKeg(connection, req.body);
    return res.status(204).send(resp);
}
exports.sani = async (req, res) => {
    const resp = await bulkKegQueries.bulkSaniKeg(connection, req.body);
    return res.status(204).send(resp);
}
exports.breakdown = async (req, res) => {
    const resp = await bulkKegQueries.bulkBreakdownKeg(connection, req.body);
    return res.status(204).send(resp);
}
const bulkKegQueries = require('../queries/bulkKegQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);

exports.relocate = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await bulkKegQueries.bulkUpdateKegLocation(connection, req.body);
    connection.close();
    return res.status(204).send(resp);
}
exports.wash = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await bulkKegQueries.bulkWashKeg(connection, req.body);
    connection.close();
    return res.status(204).send(resp);
}
exports.fill = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await bulkKegQueries.bulkFillKeg(connection, req.body);
    connection.close();
    return res.status(204).send(resp);
}
exports.sani = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await bulkKegQueries.bulkSaniKeg(connection, req.body);
    connection.close();
    return res.status(204).send(resp);
}
exports.breakdown = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await bulkKegQueries.bulkBreakdownKeg(connection, req.body);
    connection.close();
    return res.status(204).send(resp);
}
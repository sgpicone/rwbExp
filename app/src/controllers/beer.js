const beerQueries = require('../queries/beerQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);

exports.list = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await beerQueries.getBeers(connection);
    connection.close();
    console.log(resp);
    res.status(200).send(resp);
};

exports.get = async (req, res) => {
    var connection = dbFactory.makeDb();
    const resp = await beerQueries.getBeer(connection, req.params.beerId);
    connection.close();
    console.log(resp);
    res.status(200).send(resp);
}
const beerQueries = require('../queries/beerQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb();

exports.list = async (req, res) => {
    const resp = await beerQueries.getBeers(connection);
    console.log(resp);
    res.status(200).send(resp);
};

exports.get = async (req, res) => {
    const resp = await beerQueries.getBeer(connection, req.params.beerId);
    console.log(resp);
    res.status(200).send(resp);
}
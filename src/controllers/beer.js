const beerQueries = require('../queries/beerQueries');
const dbFactory = require('../dbFactory');

console.error(process.env.DB_HOST);
var connection = dbFactory.makeDb({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});

exports.list = async (req, res) => {
    const resp = await beerQueries.getBeers(connection);
    console.log(resp);
    res.status(200).send(resp);
};
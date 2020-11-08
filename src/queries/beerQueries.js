const getBeers = async (connection) => {
    const query = `SELECT * FROM rwbbc.beers`;
    return await connection.query(query);
};

module.exports = {
    getBeers: getBeers
};


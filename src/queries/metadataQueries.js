const getKegTypes = async (connection) => {
    const query = `SELECT * FROM rwbbc_data.keg_types;`
    return await connection.query(query);
};

const getChemicals = async (connection) => {
    const query = `SELECT * FROM rwbbc_data.chemicals;`;
    return await connection.query(query);
};

module.exports = {
    getKegTypes: getKegTypes,
    getChemicals: getChemicals
};


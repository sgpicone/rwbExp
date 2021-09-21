const setTriviaUrl = async (connection, url) => {
    const query = `update rwbbc.config_data set config_data = '{
        "url": "${url}"
    }' where config_name = 'trivia-redirect';`
    return await connection.query(query);
};

const getConfigData = async (connection) => {
    const query = `SELECT * FROM rwbbc.config_data`;
    const resp = await connection.query(query);
    const configData = resp.map((entry) => {
        return {'data': JSON.parse(entry.config_data.toString('utf-8')), ...entry}
    });
    return configData;
};

module.exports = {
    setTriviaUrl: setTriviaUrl,
    getConfigData: getConfigData
};


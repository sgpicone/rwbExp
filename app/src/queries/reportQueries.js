async function getExciseTaxes(connection, year) {
    let qYear = year || new Date().getFullYear();
    const exciseTaxQuery = `SELECT * FROM rwbbc_data.ExciseTaxes WHERE YEAR >= ${qYear};`;
    return await connection.query(exciseTaxQuery);
}

async function getInventory(connection) {
    const inventoryQuery = `SELECT CurBeer, kt.type, CurLoc, COUNT(KegTypeId), SUM(CurGallons), MAX(CurLocDate) FROM Inventory t
    JOIN rwbbc_data.keg_types kt ON t.KegTypeId = kt.Id
    WHERE CurLoc IN (SELECT NAME FROM rwbbc_data.locations WHERE TYPE LIKE 'FULL%')
    GROUP BY CurBeer, CurLoc, KegTypeId
    ORDER BY CurLoc DESC,  kt.Type ASC, CurBeer ASC;`
    return await connection.query(inventoryQuery);
}

module.exports = {
    getExciseTaxes : getExciseTaxes,
    getInventory : getInventory
}
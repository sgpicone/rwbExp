
const KEG_DETAIL_SELECT = `SELECT 
k.*, 
concat('[', group_concat('{ "date": "', kwh.WashDate, '", "chemical": "', wc.Name, '" }'), ']') as washHistory,
concat('[', group_concat('{ "date": "', ksh.SaniDate, '", "chemical": "', sc.Name, '" }'), ']') as saniHistory,
concat('[', group_concat('{ "date": "', ksale.SaleDate, '", "chemical": "', ksale.FK_CustomerId, '" }'), ']') as saleHistory
from rwbbc_data.keg_info k
left join rwbbc_data.keg_wash_history kwh on k.RWBId = kwh.FK_RWBId
left join rwbbc_data.Chemicals wc on kwh.FK_WashChemicalId = wc.Id
left join rwbbc_data.keg_sani_history ksh on k.RWBId = ksh.FK_RWBId
left join rwbbc_data.Chemicals sc on ksh.FK_WashChemicalId = sc.Id
left join rwbbc_data.keg_sale_history ksale on k.RWBId = ksale.FK_RWBId`;

const KEG_DETAIL = `SELECT 
k.* 
from rwbbc_data.keg_info k`;

/*
SELECT WashDate, GROUP_CONCAT(c.name) FROM keg_wash_history kwh 
JOIN Chemicals c ON kwh.FK_WashChemicalId = c.Id 
WHERE kwh.FK_RWBId = 'RWB-6-001'
GROUP BY kwh.WashDate;
*/

const getKegs = async (connection) => {
    const rows = await connection.query(`SELECT k.*, kwh.LastWashDate, ksh.LastSaniDate, ksales.LastSaleDate, kt.Type
    FROM rwbbc_data.keg_info k
    JOIN rwbbc_data.keg_types kt ON k.KegTypeId = kt.Id
    LEFT JOIN (
        SELECT FK_RWBId, max(WashDate) AS LastWashDate
        FROM rwbbc_data.keg_wash_history
        GROUP BY FK_RWBId 
    ) kwh on k.RWBId = kwh.FK_RWBId 
    LEFT JOIN (
        SELECT FK_RWBId, max(SaniDate) AS LastSaniDate
        FROM rwbbc_data.keg_sani_history
        GROUP BY FK_RWBId 
    ) ksh on k.RWBId = ksh.FK_RWBId 
    LEFT JOIN (
        SELECT FK_RWBId, max(SaleDate) AS LastSaleDate
        FROM rwbbc_data.keg_sale_history
        GROUP BY FK_RWBId 
    ) ksales on k.RWBId = ksales.FK_RWBId`);
    console.log(rows);
    return rows;
};

const getKegDetailsById = async (connection, kegId) => {
    const query = `SELECT 
    k.*
    from rwbbc_data.keg_info k
    where k.Id = ${kegId}
    ORDER BY k.Id;

    SELECT WashDate, GROUP_CONCAT(c.name) as WashChemicals
    FROM rwbbc_data.keg_wash_history kwh 
    JOIN rwbbc_data.Chemicals c ON kwh.FK_WashChemicalId = c.Id 
    WHERE kwh.FK_RWBId = (SELECT RWBId FROM rwbbc_data.keg_info WHERE Id = ${kegId})
    GROUP BY kwh.WashDate;

    SELECT SaniDate, GROUP_CONCAT(c.name) as SaniChemicals
    FROM rwbbc_data.keg_sani_history ksh 
    JOIN rwbbc_data.Chemicals c ON ksh.FK_SaniChemicalId = c.Id 
    WHERE ksh.FK_RWBId = (SELECT RWBId FROM rwbbc_data.keg_info WHERE Id = ${kegId})
    GROUP BY ksh.SaniDate;

    SELECT SaleDate, GROUP_CONCAT(FK_CustomerId) as Customers
    FROM rwbbc_data.keg_sale_history ksh 
    WHERE ksh.FK_RWBId = (SELECT RWBId FROM rwbbc_data.keg_info WHERE Id = ${kegId})
    GROUP BY ksh.SaleDate;
    `
    let results = await connection.query(query);
    let keg = results[0][0];
    keg.WashHistory = results[1];
    keg.SaniHistory = results[2];
    keg.SaleHistory = results[3];
    return keg;
};

const findKegByRwbId = async (connection, rwbId) => {
    return await connection.query(
        `${KEG_DETAIL_SELECT}
    WHERE k.RWBId = '${rwbId}'
    group by k.RWBId;`);
};

const updateKegById = async (connection, id, keg) => {
    return await connection.query(
        `UPDATE rwbbc_data.keg_info 
        SET RWBId = '${keg.RWBId}', 
        FactorySerial = '${keg.FactorySerial}', 
        Notes = '${keg.Notes}', 
        KegTypeId = (SELECT Id FROM rwbbc_data.keg_types WHERE Type = upper('${keg.KegType}'))
        WHERE Id = ${id}`
    );
};

const createKeg = async (connection, keg) => {
    return await connection.query(`INSERT INTO rwbbc_data.keg_info 
        (RWBId, FactorySerial, ReceivedDate, Used, Notes, KegTypeId)
        VALUE (keg.RWBId, keg.FactorySerial, keg.ReceivedDate, keg.Used, keg.Notes,
            (SELECT Id FROM rwbbc_data.keg_types WHERE Type = upper('${keg.KegType}')))`);
};

const deleteKegById = async (connection, id) => {
    return await connection.query(`DELETE FROM rwbbc_data.keg_info WHERE Id = ${id}`);
};

const addKegWashLog = async (connection, washLog) => {
    const query = `INSERT INTO rwbbc_data.keg_wash_history 
    (FK_RWBId, WashDate, FK_WashChemicalId) VALUES
    (${washLog.RWBId}, ${washLog.washDate}, (SELECT Id from rwbbc_data.Chemicals WHERE Name = ${washLog.chemical}))`;
    return await connection.query(query);
};

const addKegSaniLog = async (connection, saniLog) => {
    const query = `INSERT INTO rwbbc_data.keg_sani_history 
    (FK_RWBId, SaniDate, FK_SaniChemicalId) VALUES
    (${saniLog.RWBId}, ${saniLog.washDate}, (SELECT Id from rwbbc_data.Chemicals WHERE Name = ${saniLog.chemical}))`;
    return await connection.query(query);
}

const addKegFillLog = async (connection, fillLog) => {
    const query = `INSERT INTO rwbbc_data.keg_fill_history 
    (FK_RWBId, FillDate, FK_BeerId) VALUES
    (${fillLog.RWBId}, ${fillLog.fillDate}, (SELECT Id from rwbbc.beers WHERE Name = ${fillLog.beer}))`;
    return await connection.query(query);
}

const addKegSaleLog = async (connection, saleLog) => {
    const query = `INSERT INTO rwbbc_data.keg_sale_history 
    (FK_RWBId, SaleDate, FK_BeerId, FK_CustomerId) VALUES
    (${saleLog.RWBId}, ${saleLog.saleDate}, 
        (SELECT Id from rwbbc.beers WHERE Name = ${saleLog.beer}),
        (SELECT Id from rwbbc_data.customers WHERE Name = ${saleLog.customerName}))`;
    return await connection.query(query);
}

const testGetKegs = async (connection, kegId) => {
    const query = `SELECT 
    k.*
    from rwbbc_data.keg_info k
    where k.Id = ${kegId}
    ORDER BY k.Id;

    SELECT WashDate, GROUP_CONCAT(c.name) as WashChemicals
    FROM rwbbc_data.keg_wash_history kwh 
    JOIN rwbbc_data.Chemicals c ON kwh.FK_WashChemicalId = c.Id 
    WHERE kwh.FK_RWBId = (SELECT RWBId FROM rwbbc_data.keg_info WHERE Id = ${kegId})
    GROUP BY kwh.WashDate;

    SELECT SaniDate, GROUP_CONCAT(c.name) as SaniChemicals
    FROM rwbbc_data.keg_sani_history ksh 
    JOIN rwbbc_data.Chemicals c ON ksh.FK_SaniChemicalId = c.Id 
    WHERE ksh.FK_RWBId = (SELECT RWBId FROM rwbbc_data.keg_info WHERE Id = ${kegId})
    GROUP BY ksh.SaniDate;

    SELECT SaleDate, GROUP_CONCAT(FK_CustomerId) as Customers
    FROM rwbbc_data.keg_sale_history ksh 
    WHERE ksh.FK_RWBId = (SELECT RWBId FROM rwbbc_data.keg_info WHERE Id = ${kegId})
    GROUP BY ksh.SaleDate;
    `
    let results = await connection.query(query);
    let keg = results[0][0];
    keg.WashHistory = results[1];
    keg.SaniHistory = results[2];
    keg.SaleHistory = results[3];
    return keg;
}

module.exports = {
    getKegs: getKegs,
    getKegById: getKegDetailsById,
    findKegByRwbId: findKegByRwbId,
    updateKegById: updateKegById,
    deleteKegById: deleteKegById,
    addKegWashLog: addKegWashLog,
    addKegSaniLog: addKegSaniLog,
    addKegFillLog: addKegFillLog,
    addKegSaleLog: addKegSaleLog,
    testGetKegs: testGetKegs
};
const kegDetailsAliases = `
KegDetails.\`Id\` as id,
KegDetails.\`RWBId\` as rwbId,
KegDetails.\`FactorySerial\` as factorySerial,
KegDetails.\`ReceivedDate\` as receivedDate,
KegDetails.\`Used\` as used,
KegDetails.\`Notes\` as notes,
KegDetails.\`KegType\` as kegType,
KegDetails.\`Current Location\` as currentLocation,
KegDetails.\`Last Fill Date\` as lastFillDate,
KegDetails.\`Last Fill Beer\` as lastFillBeer,
KegDetails.\`Last Fill Volume\` as lastFillVolume,
KegDetails.\`Last Wash Date\` as lastWashDate,
KegDetails.\`Last Wash Chemical\` as lastWashChemical,
KegDetails.\`Next Wash Chemical\` as nextWashChemical,
KegDetails.\`Last Sani Date\` as lastSaniDate,
KegDetails.\`Last Breakdown\` as lastBreakdown,
KegDetails.\`STATUS\` as status,
KegDetails.\`NumIssues\` as numIssues`;

const getKegs = async (connection) => {
    const rows = await connection.query(`SELECT ${kegDetailsAliases} FROM rwbbc_data.KegDetails`);
    console.log(rows);
    return rows;
};

const getKegDetailsById = async (connection, kegId) => {
    const kegDetailsQuery = `SELECT ${kegDetailsAliases} FROM rwbbc_data.KegDetails where RWBId = '${kegId}' LIMIT 1;`;
    const fillHistoryQuery = `SELECT FillDate as fillDate, b.Name as beer, Gallons as volume 
        FROM rwbbc_data.keg_fill_history kfh 
        JOIN rwbbc.beers b ON kfh.FK_BeerId = b.Id
        WHERE kfh.FK_RWBId = '${kegId}' order by FillDate desc LIMIT 5;`;
    const washHistoryQuery = `SELECT WashDate as washDate, c.Name as chemical, c.ChemicalType as chemicalType
        FROM rwbbc_data.keg_wash_history kwh 
        JOIN rwbbc_data.chemicals c ON kwh.FK_WashChemicalId = c.Id
        WHERE kwh.FK_RWBId = '${kegId}' order by WashDate desc LIMIT 5;`;
    const saniHistoryQuery = `SELECT SaniDate as saniDate, c.Name as chemical, c.ChemicalType as chemicalType
        FROM rwbbc_data.keg_sani_history ksh 
        JOIN rwbbc_data.chemicals c ON ksh.FK_SaniChemicalId = c.Id
        WHERE ksh.FK_RWBId = '${kegId}' order by SaniDate desc LIMIT 5;`;
    const locationHistoryQuery = `SELECT LocationDate as locationDate, l.Name as location, l.Type as locationType
        FROM rwbbc_data.keg_location_history klh 
        JOIN rwbbc_data.locations l ON klh.FK_LocationId = l.Id
        WHERE klh.FK_RWBId = '${kegId}' order by LocationDate desc LIMIT 10;`;
    const issueHistoryQuery = `SELECT IssueDate as issueDate, Reporter as reporter, Issue as issue, Resolved as resolved
        FROM rwbbc_data.keg_issue_log kil 
        WHERE kil.FK_RWBId = '${kegId}' order by IssueDate DESC;`;
    const breakdownHistoryQuery = `SELECT FK_RWBId as rwbId, BreakdownDate as breakdownDate
        FROM rwbbc_data.keg_breakdown_history kbh 
        WHERE kbh.FK_RWBId = '${kegId}' order by BreakdownDate DESC;`;
    
    const detailQuery = `${kegDetailsQuery} ${fillHistoryQuery} ${washHistoryQuery}
    ${saniHistoryQuery} ${locationHistoryQuery} ${issueHistoryQuery} ${breakdownHistoryQuery}`;
    
    let results = await connection.query(detailQuery);
    let keg = results[0][0];
    if(!keg) return {};
    keg.fillHistory = results[1];
    keg.washHistory = results[2];
    keg.saniHistory = results[3];
    keg.locationHistory = results[4];
    keg.issueHistory = results[5];
    keg.breakdownHistory = results[6];
    return keg;
};

const findKegByRwbId = async (connection, rwbId) => {
    return getKegDetailsById(connection, rwbId);
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
        VALUE ('${keg.RWBId}', '${keg.FactorySerial}', STR_TO_DATE('${keg.ReceivedDate}', '%Y-%m-%d'), ${keg.Used}, '${keg.Notes}',
            (SELECT Id FROM rwbbc_data.keg_types WHERE Type = upper('${keg.KegType}')))`);
};

const deleteKegById = async (connection, id) => {
    return await connection.query(`DELETE FROM rwbbc_data.keg_info WHERE Id = ${id}`);
};

const updateKegLocation = async (connection, kegId, locationLog) => {
    const createQuery = `INSERT INTO rwbbc_data.keg_location_history (FK_RWBId, LocationDate, FK_LocationId) VALUES
        (
            "${kegId}",
            STR_TO_DATE("${locationLog.date}", '%Y-%m-%d %H:%i:%s'),
            (SELECT Id FROM locations WHERE name = "${locationLog.locationName}")
        );`;
    return await connection.query(createQuery);
};

const addKegWashLog = async (connection, kegId, washLog) => {
    const query = `INSERT INTO rwbbc_data.keg_wash_history 
    (FK_RWBId, WashDate, FK_WashChemicalId) VALUES
    ("${kegId}", "${washLog.washDate}", (SELECT Id from rwbbc_data.chemicals WHERE Name = "${washLog.chemical}"));`;
    return await connection.query(query);
};

const addKegSaniLog = async (connection, kegId, saniLog) => {
    const query = `INSERT INTO rwbbc_data.keg_sani_history 
    (FK_RWBId, SaniDate) VALUES
    ("${kegId}", "${saniLog.saniDate}");`;
    return await connection.query(query);
}

const addKegBreakdownLog = async (connection, kegId, breakdownLog) => {
    const query = `INSERT INTO rwbbc_data.keg_breakdown_history 
        (FK_RWBId, BreakdownDate) VALUES
    ("${kegId}", "${breakdownLog.breakdownDate}");`;
    return await connection.query(query);
}

const addKegFillLog = async (connection, kegId, fillLog) => {
    console.log(fillLog);
    const query = `INSERT INTO rwbbc_data.keg_fill_history 
    (FK_RWBId, FillDate, FK_BeerId, Gallons) VALUES
    ("${kegId}", "${fillLog.fillDate}", (SELECT Id from rwbbc.beers WHERE Name = "${fillLog.beer}"), ${fillLog.fillVolume})`;
    console.log(query);
    return await connection.query(query);
}

const addKegIssue = async (connection, kegId, issue) => {
    const createQuery = `INSERT INTO rwbbc_data.keg_issue_log (FK_RWBId, IssueDate, Reporter, Issue) VALUES
        (
            "${kegId}",
            ${issue.date},
            "${issue.reporter}",
            "${issue.issue}"
        );`;
    return await connection.query(createQuery);
}

const addKegSaleLog = async (connection, saleLog) => {
    const query = `INSERT INTO rwbbc_data.keg_sale_history 
    (FK_RWBId, SaleDate, FK_BeerId, FK_CustomerId) VALUES
    ("${saleLog.RWBId}", "${saleLog.saleDate}", 
        (SELECT Id from rwbbc.beers WHERE Name = "${saleLog.beer}"),
        (SELECT Id from rwbbc_data.customers WHERE Name = "${saleLog.customerName}"))`;
    return await connection.query(query);
}

const getKegInfo = async (connection, kegId) => {
    const query = `SELECT 
    k.*
    from rwbbc_data.keg_info k
    where k.Id = ${kegId}
    ORDER BY k.Id;

    SELECT WashDate, GROUP_CONCAT(c.name) as WashChemicals
    FROM rwbbc_data.keg_wash_history kwh 
    JOIN rwbbc_data.chemicals c ON kwh.FK_WashChemicalId = c.Id 
    WHERE kwh.FK_RWBId = (SELECT RWBId FROM rwbbc_data.keg_info WHERE Id = ${kegId})
    GROUP BY kwh.WashDate;

    SELECT SaniDate, GROUP_CONCAT(c.name) as SaniChemicals
    FROM rwbbc_data.keg_sani_history ksh 
    JOIN rwbbc_data.chemicals c ON ksh.FK_SaniChemicalId = c.Id 
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
    createKeg: createKeg,
    updateKegById: updateKegById,
    deleteKegById: deleteKegById,
    addKegWashLog: addKegWashLog,
    addKegSaniLog: addKegSaniLog,
    addKegFillLog: addKegFillLog,
    addKegBreakdownLog: addKegBreakdownLog,
    addKegIssue: addKegIssue,
    updateKegLocation: updateKegLocation
    // addKegSaleLog: addKegSaleLog
    // getKegInfo: getKegInfo
};
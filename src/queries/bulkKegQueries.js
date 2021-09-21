async function bulkUpdateKegLocation(connection, body) {
    let valueArray = body.kegIds.map(kegId =>
        `("${kegId}", STR_TO_DATE("${body.date}", '%Y-%m-%d %H:%i:%s'), (SELECT Id FROM locations WHERE name = "${body.locationName}"))`
    );
    const bulkCreateQuery = `INSERT INTO rwbbc_data.keg_location_history (FK_RWBId, LocationDate, FK_LocationId) VALUES ${valueArray.join(',')};`
    return await connection.query(bulkCreateQuery);
}

async function bulkWashKeg(connection, body) {
    let valueArray = body.kegIds.map(kegId =>
        `("${kegId}", STR_TO_DATE('${body.washDate}', '%Y-%m-%d %H:%i:%s'), (SELECT Id FROM chemicals WHERE name = '${body.washChemical}'))`
    )
    const bulkCreateQuery = `INSERT INTO rwbbc_data.keg_wash_history (FK_RWBId, WashDate, FK_WashChemicalId) VALUES ${valueArray.join(',')};`;
    console.log(`Running ${bulkCreateQuery}`);
    return await connection.query(bulkCreateQuery);
}

async function bulkFillKeg(connection, body) {
    let valueArray = body.kegs.map(keg =>
        `("${keg.kegId}", (SELECT Id FROM rwbbc.beers WHERE name = "${keg.fillBeer}"), STR_TO_DATE("${keg.fillDate}", '%Y-%m-%d %H:%i:%s'), ${keg.fillVolume})`
    );
    const bulkCreateQuery = `INSERT INTO rwbbc_data.keg_fill_history (FK_RWBId, FK_BeerId, FillDate, Gallons) VALUES ${valueArray.join(',')};`;
    return await connection.query(bulkCreateQuery);
}

async function bulkSaniKeg(connection, body) {
    let valueArray = body.kegIds.map(kegId =>
        `("${kegId}", STR_TO_DATE("${body.saniDate}", '%Y-%m-%d %H:%i:%s'))`
    );
    const bulkCreateQuery = `INSERT INTO rwbbc_data.keg_sani_history (FK_RWBId, SaniDate) VALUES ${valueArray.join(',')};`;
    return await connection.query(bulkCreateQuery);
}

async function bulkBreakdownKeg(connection, body) {
    let valueArray = body.kegIds.map(kegId =>
        `("${kegId}", STR_TO_DATE("${body.breakdownDate}", '%Y-%m-%d %H:%i:%s'))`
    );
    const bulkCreateQuery = `INSERT INTO rwbbc_data.keg_breakdown_history (FK_RWBId, BreakdownDate) VALUES ${valueArray.join(',')};`;
    return await connection.query(bulkCreateQuery);
}

module.exports = {
    bulkUpdateKegLocation : bulkUpdateKegLocation,
    bulkWashKeg : bulkWashKeg,
    bulkFillKeg : bulkFillKeg,
    bulkSaniKeg : bulkSaniKeg,
    bulkBreakdownKeg : bulkBreakdownKeg
};
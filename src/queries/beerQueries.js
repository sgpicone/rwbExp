const getBeers = async (connection) => {
    const query = `SELECT * FROM rwbbc.beers`;
    return await connection.query(query);
};

async function getCocktails(connection) {
    const cocktailQuery = `SELECT bt.*, CONCAT('[', group_concat(json_object('name', b.name, 'style', b.style)), ']') AS bases 
    FROM rwbbc_data.cocktails bt
    JOIN rwbbc_data.cocktail_bases btb ON btb.cocktail_id = bt.id
    JOIN rwbbc.beers b ON btb.beer_id = b.id
    GROUP BY bt.id;`;

    return await connection.query(cocktailQuery);
}

const getBeer = async (connection, id) => {
    const query = `SELECT * FROM rwbbc.beers where id = ${id}`;
    return await connection.query(query);
};

function getCocktail(id, callback) {
    var connection = makeConnection();

    connection.connect();
    
    const cocktailQuery = `SELECT bt.*, CONCAT('[', group_concat(json_object('name', b.name, 'style', b.style)), ']') AS bases 
    FROM rwbbc_data.cocktails bt
    JOIN rwbbc_data.cocktail_bases btb ON btb.cocktail_id = bt.id
    JOIN rwbbc.beers b ON btb.beer_id = b.id
    WHERE bt.id = ${id}
    GROUP BY bt.id;`;

    connection.query(cocktailQuery, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error fetching cocktail with id = ${id}: ${err}`);
        }
    });
}

function getBeerOnTap(id, callback) {
    var connection = makeConnection();

    connection.connect();

    connection.query(`SELECT is_on_tap FROM rwbbc.beers where id = ${id}`, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error fetching beer with id = ${id}: ${err}`);
        }
    });
}

function getCocktailOnTap(id, callback) {
    var connection = makeConnection();

    connection.connect();

    connection.query(`SELECT is_on_tap FROM rwbbc_data.cocktails where id = ${id}`, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error fetching cocktail with id = ${id}: ${err}`);
        }
    });
}


function changeBeerOnTapStatus(id, value, callback) {
    var connection = makeConnection();
    
    if(value === undefined || isNaN(Number(value))) {
        callback(`Error - ontap value cannot be undefined and must be a bit value. Expected 1/0, received ${value}`);
    }
    
    var sqlValue = Number(value) ? 1 : 0;

    connection.connect();

    connection.query(`UPDATE rwbbc.beers SET is_on_tap = ${sqlValue} where id = ${id}`, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error updating beer with id = ${id}: ${err}`);
        }
    });
}

function changeCocktailOnTapStatus(id, value, callback) {
    var connection = makeConnection();
    
    if(value === undefined || isNaN(Number(value))) {
        callback(`Error - ontap value cannot be undefined and must be a bit value. Expected 1/0, received ${value}`);
    }
    
    var sqlValue = Number(value) ? 1 : 0;

    connection.connect();

    connection.query(`UPDATE rwbbc_data.cocktails SET is_on_tap = ${sqlValue} where id = ${id}`, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error updating cocktail with id = ${id}: ${err}`);
        }
    });
}


function editBeer(id, beerString, callback) {
    var connection = makeConnection();
    let beer = JSON.parse(beerString);
    if(beer === undefined || !isValidBeerObject(beer)) {
        callback(`Error - body of request must include valid beer JSON object. Must include all valid beer properties. Received ${beer}`);
    }
    
    connection.connect();
    
    const updateQuery = `UPDATE rwbbc.beers
        SET
            grouping = "${beer.grouping}",
            is_on_tap = ${Number(beer.is_on_tap) ? 1 : 0},
            name = "${beer.name}",
            style = "${beer.style}",
            abv = ${Number(beer.abv)},
            ibu = ${Number(beer.ibu)},
            srm = ${Number(beer.srm)},
            description = "${beer.description}",
            serve_size = ${Number(beer.serve_size)},
            flavor_notes = "${beer.flavor_notes}",
            short_desc = "${beer.short_desc}",
            non_vegan = ${Number(beer.non_vegan) ? 1 : 0}
        WHERE id = ${id}`;
        
    connection.query(updateQuery, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error updating beer ${id}: ${err}`);
        }
    });
    
    
}

function editCocktail(id, cocktail, callback) {
    if(true) {
        callback(`Error - not implemented`);
        return;
    }
    var connection = makeConnection();
    
    if(cocktail === undefined || !isValidBeerObject(cocktail)) {
        callback(`Error - body of request must include valid beer JSON object. Must include all valid beer properties. Received ${cocktail}`);
    }
    
    connection.connect();
    
    const updateQuery = `UPDATE rwbbc_data.cocktails
        SET
            grouping = "${cocktail.grouping}",
            is_on_tap = ${Number(cocktail.is_on_tap) ? 1 : 0},
            name = "${cocktail.name}",
            style = "${cocktail.style}",
            abv = ${Number(cocktail.abv)},
            ibu = ${Number(cocktail.ibu)},
            srm = ${Number(cocktail.srm)},
            description = "${cocktail.description}",
            serve_size = ${Number(cocktail.serve_size)},
            flavor_notes = "${cocktail.flavor_notes}",
            short_desc = "${cocktail.short_desc}",
            non_vegan = ${Number(cocktail.non_vegan) ? 1 : 0}
        WHERE id = ${id}`;
        
    connection.query(updateQuery, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error updating beer ${id}: ${err}`);
        }
    });
    
    
}

function createBeer(beerString, callback) {
    var connection = makeConnection();
    let beer = JSON.parse(beerString);
    if(beer === undefined || !isValidBeerObject(beer)) {
        callback(`Error - body of request must include valid beer JSON object. Must include all valid beer properties. Received ${beer}`);
    }
    
    connection.connect();
    
    const createQuery = `INSERT INTO rwbbc.beers (grouping, is_on_tap, name, style, abv, ibu, srm, description, serve_size, flavor_notes, short_desc, non_vegan) VALUES
        (
            "${beer.grouping}",
            ${Number(beer.is_on_tap) ? 1 : 0},
            "${beer.name}",
            "${beer.style}",
            ${Number(beer.abv)},
            ${Number(beer.ibu)},
            ${Number(beer.srm)},
            "${beer.description}",
            ${Number(beer.serve_size)},
            "${beer.flavor_notes}",
            "${beer.short_desc}",
            ${Number(beer.non_vegan) ? 1 : 0}
        );`
    connection.query(createQuery, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error creating beer: ${err}`);
        }
    });
}

function createCocktail(cocktail, callback) {
    if(true) {
        callback(`Error - not implemented`);
        return;
    }
    var connection = makeConnection();
    
    if(cocktail === undefined || !isValidBeerObject(cocktail)) {
        callback(`Error - body of request must include valid beer JSON object. Must include all valid beer properties. Received ${cocktail}`);
    }
    
    connection.connect();
    
    const createQuery = `INSERT INTO rwbbc.beers (grouping, is_on_tap, name, style, abv, ibu, srm, description, serve_size, flavor_notes, short_desc, non_vegan) VALUES
        (
            "${cocktail.grouping}",
            ${Number(cocktail.is_on_tap) ? 1 : 0},
            "${cocktail.name}",
            "${cocktail.style}",
            ${Number(cocktail.abv)},
            ${Number(cocktail.ibu)},
            ${Number(cocktail.srm)},
            "${cocktail.description}",
            ${Number(cocktail.serve_size)},
            "${cocktail.flavor_notes}",
            "${cocktail.short_desc}",
            ${Number(cocktail.non_vegan) ? 1 : 0}
        );`
    connection.query(createQuery, function(err, rows, fields) {
        connection.destroy();
        if (!err) {
            callback(null, rows);
        }
        else {
            callback(`Error creating beer: ${err}`);
        }
    });
}

function isValidBeerObject(obj) {
    console.log(JSON.stringify(obj));
    let validId = obj.hasOwnProperty("id");
    let validProperties =  (obj.hasOwnProperty("grouping") &&
                            obj.hasOwnProperty("is_on_tap") &&
                            obj.hasOwnProperty("name") &&
                            obj.hasOwnProperty("style") &&
                            obj.hasOwnProperty("abv") &&
                            obj.hasOwnProperty("ibu") &&
                            obj.hasOwnProperty("srm") &&
                            obj.hasOwnProperty("description") &&
                            obj.hasOwnProperty("serve_size") &&
                            obj.hasOwnProperty("flavor_notes") &&
                            obj.hasOwnProperty("short_desc") &&
                            obj.hasOwnProperty("non_vegan"));
    return validId && validProperties;
}

module.exports = {
    getBeers: getBeers,
    getBeer: getBeer
};


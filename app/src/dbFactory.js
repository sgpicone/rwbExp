const util = require( 'util' );
const mysql = require( 'mysql' );

const DEFAULT_CONFIG = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  multipleStatements: true,
  database: process.env.DB_DATABASE
};

function makeDb( config ) {
  if(!config) config = DEFAULT_CONFIG;
  const connection = mysql.createConnection( config );  return {
    query( sql, args ) {
      return util.promisify( connection.query )
        .call( connection, sql, args );
    },
    close() {
      return util.promisify( connection.end ).call( connection );
    }
  };
}

module.exports = {
    makeDb: makeDb
};
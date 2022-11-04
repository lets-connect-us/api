/**
 * Required External Modules
 * for some reason sqlite has to be required here rather than in the class
 * for some reason bluebird has to be required here rather than in the class
 */
var sqlite3 = require('sqlite3');
//var bluebird = require('bluebird');

/**
 * //function to connect to an sqlite file
 */
function connect(values={}){

/**
 * get file name
 */
let db_file = '';
if (
	(typeof values == 'object')
	&&
	(typeof values['db_file'] == 'string')
	&&
	(values['db_file'])
){
	db_file = values['db_file'];
}
if (
	(!db_file)
	&&
	(typeof this.db_file == 'string')
	&&
	(this.db_file)
){
	db_file = this.db_file;
}
if (
	(typeof db_file != 'string')
	||
	(!db_file)
){
	console.log('No SQLite database file name provided.');
	return false;
}

/**
 * get open mode
 */
//future do we want to use sqlite3.OPEN_READWRITE or sqlite3.OPEN_READONLY? is performance/data impacted by just leaving the connection open?

/**
 * create connection object key to cache connections
 */
let connection_key = db_file.toLowerCase;
connection_key = db_file.replace(/[^a-z]+/gi, "");

/**
 * check if we're already connected based on connection key
 */
if (this.connections[ connection_key ]){
	console.log('Existing connection returned for: ' + connection_key);
	return this.connections[ connection_key ];
}

/**
 * create new DB connection
 */
let connection = new sqlite3.Database(db_file, (err) => {
	if (err) {
		console.log('Unable to connect to database', err);
		return false;
	}
});

/**
 * build cache and return
 * and return connection
 */
this.connections[ connection_key ] = connection;
return connection;

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = connect;

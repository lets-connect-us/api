/**
 * directory alieases 
 * and environment config
 */
require('module-alias/register');
var dotenv = require('dotenv');
dotenv.config();
dotenv.config({ path: './secret.env' });
//dotenv.config({ path: './firebase.env' });

/**
 * App Variables
 * //note must be done before any classes/modules
 * //note but must be done after module-alias and dotenv
 */
//var constants = require('./constants.inc');

/**
 * init express/app
 */
var express = require("express");
var cors = require("cors");
var helmet = require("helmet");
const app = express();

/**
 * Required External Modules
 * for some reason sqlite has to be required here rather than in the class
 * for some reason bluebird has to be required here rather than in the class
 */
var cookie_parser = require('cookie-parser');
var body_parser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var crypto = require('crypto');

/**
 * classes and internal modules
 */
//var length = require('~classes/length');

/**
 * database setup
 */
var db = require('~classes/db.sqlite');
var migrate_database = require('./migrate_database');
migrate_database.run({
	'connection' : db.connect({'db_file' : './calendars.db'}), 
	'name' : 'calendars', 
});

/**
 * setup Express app
 */
app.set("port", process.env.PORT);
app.use(helmet());
app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cookie_parser());

/**
 * setup session
 */
app.use(session({
	'resave': true, 
	'saveUninitialized': true, 
    'store': new FileStore({}),
    'secret': process.env.ENVIRONEMENT + process.env.SESSION_SECRET, 
    'cookie': { maxAge: 3600000, secure: false, httpOnly: true }, 
}));

/**
 * //debug output some basic content
 */
app.get('/', (request, result) => {

/**
 * insert new entry
 */
let tmp = new Date().toString();
db['connections']['calendarsdb'].run(`INSERT INTO "store" ("unique_hash", "json") VALUES ('test', '{"test": "` + tmp + `"}');`, 
    [],
    function(error){
		if (
			(error)
			&&
			(typeof error['message'] == 'string')
		){
			console.log('Error adding new date entry:' + error['message']);
		}
    }
);

/**
 * select all and build output
 */
const output = [];
db['connections']['calendarsdb'].all("SELECT * FROM store",
    (error, query_result) => {
		for (let key in query_result){
			console.log(query_result[ key ]);
			output.push('<p>' + query_result[ key ]['id'] + ': ' + query_result[ key ]['json'] + '</p>');
		}
		result.send(output.join(''));
    }
);

/**
 * done function
 */
});

/**
 * export app
 */
module.exports = app;

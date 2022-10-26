/**
 * directory alieases 
 * and environment config
 */
import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: 'secret.env' });
//dotenv.config({ path: 'firebase.env' });

/**
 * App Variables
 * //note must be done before any classes/modules
 * //note but must be done after module-alias and dotenv
 */
require('~src/base.inc');
var constants = require('~src/constants.inc');

/**
 * init express/app
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();

/**
 * Required External Modules
 */
global.sqlite3 = require('sqlite3'); //for some reason sqlite has to be required here rather than in the class
global.Promise = require('bluebird'); //for some reason bluebird has to be required here rather than in the class
var cookie_parser = require('cookie-parser');
var body_parser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

/**
 * classes used in this file
 */
require('~common/classes/init_server');
var sanitize = require('~common/classes/sanitize');

/**
 * database setup
 */
var migrate_database = require('~src/migrate_database');
var db = require('~common/classes/db.sqlite');
db.connect({'db_file' : './users.db'});
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
 *  App Configuration
 */

/**
 * setup read microservice API routes
 */
//require('~routes/read')(app);

/**
 * Server Activation
 */

/**
 * get a short term CSRF
 * We use this for login, register, reset, etc. Before the user is authenticated they get a 10-minute window to perform their action
 *
app.all('/csrf/get_short_term', (request, result) => {
	let get_short_term = new routes_get_short_term;

	get_short_term.entry_point({
		'request': request, 
		'result': result
	});

    result.send(output.send());
});


/**
 * /email/send
 * //todo
app.post('/email/send', (request, result) => {
	let route = require('~routes/email/send');
	route = new route['default']({
		'request' : request, 
		'result' : result, 
	});
	route.enter({
		'request_store' : {
			'request' : request, 
			'result' : result, 
		}, 
	});
});

/**
 * test/debug
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

});

export default app;

/**
 * directory alieases 
 * and environment config
 */
import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: 'secret.env' });
dotenv.config({ path: 'firebase.env' });

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
const cookie_parser = require('cookie-parser');
var body_parser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

/**
 * classes used in this file
 */
//require('~common/classes/init_server');
var db = require('~common/classes/db.sqlite');
db.connect({'db_file' : './users.db'});
console.log(db);
var sanitize = require('~common/classes/sanitize');

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
    result.send('TEST!');
});

export default app;

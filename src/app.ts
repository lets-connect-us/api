import 'module-alias/register';
import * as dotenv from "dotenv";

/**
 * init app
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
const app = express();

/**
 * get POST/body JSON parser
 */
var body_parser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

/**
 * get cookie parser
 */
const cookie_parser = require('cookie-parser');

require ('./base.inc');
require ('./constants.inc');

/** 
 * //leftoff //debug import vars
 */ 
import test from "~classes/test";
import classes_request_store from "~classes/request_store";
import output from "~classes/output";

/**
 * import routes
 */
import routes_register from "~routes/account/register";
const register = new routes_register;
import routes_get_short_term from "~routes/csrf/get_short_term";

/**
 * setup config
 */
dotenv.config();
if (!process.env.PORT) {
	console.log('No server port provided.');
	process.exit(1);
}
app.set("port", process.env.PORT || 3000);

/**
 * setup app functions
 */
app.use(helmet());
app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(cookie_parser());
app.use(session({
	'resave': true, 
	'saveUninitialized': true, 
    'store': new FileStore({}),
    'secret': process.env.ENVIRONEMENT + process.env.SESSION_SECRET, 
    'cookie': { maxAge: 3600000, secure: false, httpOnly: true }, 
}));

/**
 * get a short term CSRF
 * We use this for login, register, reset, etc. Before the user is authenticated they get a 10-minute window to perform their action
 */
app.all('/csrf/get_short_term', (request, result) => {
	let get_short_term = new routes_get_short_term;

	get_short_term.entry_point({
		'request': request, 
		'result': result
	});

    result.send(output.send());
});


/**
 * register
 */
app.post('/register', (request, result) => {
	let request_store = new classes_request_store({
		'request': request, 
		'result': result,
	});
	
	register.entry_point({
		'request_store': request_store
	});

	//result.send(output.send());
	
/**
    result.send(result['output'].send());
    result.send(
		register.entry_point({
			'request': request, 
			'result': result
		})
	);
	*/
});

/**
 * test/debug
 */

app.get('/', (request, result) => {
	request.session['views']++;
	console.log(request.session);
	result['output'] = new output;
    result.send(result['output'].send());
});

/**
 * setup read microservice API routes
 */
require('~routes/read')(app);

export default app;

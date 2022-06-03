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
import classes_output from "~classes/output";
const output = new classes_output;

/**
 * import routes
 */
import routes_register from "~routes/account/register";
import routes_get_short_term from "~routes/csrf/get_short_term";

/**
 * setup config
 */
dotenv.config();
if (!process.env.PORT) {
	console.log('No server port provided.');
	process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);
app.set("port", process.env.PORT || 3000);

/**
 * setup app functions
 */
app.use(helmet());
app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
//app.use(cookie_parser());
app.use(session({
	'resave': true, 
	'saveUninitialized': true, 
    'store': new FileStore({}),
    'secret': process.env.ENVIRONEMENT + process.env.SESSION_SECRET, 
    'cookie': { maxAge: 3600000, secure: false, httpOnly: false }, 
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
/**
	result['output'] = new classes_output;
	

    result.send(result['output'].send());
    */
});


/**
 * register
 * //debug change back to app.post
 */
app.all('/register', (request, result) => {
	let register = new routes_register;
	result['output'] = new classes_output;

    result.send(result['output'].send());
    result.send(
		register.entry_point({
			'body': request['body'], 
			'request': request, 
			'result': result
		})
	);
});

/**
 * test/debug
 */
app.all('/test', (request, result) => {
    let date = new Date();
    let return_result = 'URL called at :' + date.getHours() + ':' + date.getMinutes();
    result.send(return_result);
});

app.get('/', (request, result) => {
	request.session['views']++;
	console.log(request.session);
	result['output'] = new classes_output;
    result.send(result['output'].send());
});

export default app;

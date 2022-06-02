import 'module-alias/register';
import * as dotenv from "dotenv";

var body_parser = require('body-parser')

require ('./base.inc');
require ('./constants.inc');

import express from "express";
import cors from "cors";
import helmet from "helmet";


/** 
 * //leftoff //debug import vars
 */ 
import test from "~classes/test";

/**
 * import routes
 */
import routes_register from "~routes/account/register";
import routes_short_term from "~routes/csrf/short_term";

/**
 * init app
 */
const app = express();

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

/*
 * setup app functions
 */
app.use(helmet());
app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

/*
 * get a short term CSRF
 * We use this for login, register, reset, etc. Before the user is authenticated they get a 10-minute window to perform their action
 */
app.post('/csrf/short_term', (request, result) => {
	let short_term = new routes_short_term;
    result.send(
		short_term.entry_point({
			'body': request['body'], 
			'request': request, 
			'result': result
		})
	);
});


/*
 * register
 * //debug change back to app.post
 */
app.all('/register', (request, result) => {
	let register = new routes_register;
    result.send(
		register.entry_point({
			'body': request['body'], 
			'request': request, 
			'result': result
		})
	);
});

/*
 * register
 */
app.all('/test', (request, result) => {
    let date = new Date();
    let return_result = 'URL called at :' + date.getHours() + ':' + date.getMinutes();
    result.send(return_result);
});

app.get('/', (req, res) => {
    test.test_func(this);
    res.send('Express + Typscript be running!!!');
});

export default app;

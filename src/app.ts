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
import register from "~routes/account/register";
register = new register;

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

app.use(helmet());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser.json());
/*
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
});

/*
 * register
 */
app.all('/register', (request, result) => {
    result.send(
		register.entry_point({
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

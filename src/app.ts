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
var constants = require('~src/constants.inc');

/**
 * init express/app
 */
import { Request, Response } from "express";
var express = require("express");
var cors = require("cors");
import helmet from "helmet";
const app = express();

/**
 * Required External Modules
 * for some reason sqlite has to be required here rather than in the class
 * for some reason bluebird has to be required here rather than in the class
 */
//global.sqlite3 = require('sqlite3');
//global.Promise = require('bluebird');
var cookie_parser = require('cookie-parser');
var body_parser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var crypto = require('crypto');


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
    'secret': process.env.ENVIRONEMENT! + process.env.SESSION_SECRET!, 
    'cookie': { maxAge: 3600000, secure: false, httpOnly: true }, 
}));

/**
 * //debug output some basic content
 */
app.get('/', (request: Request, result: Response) => {

	console.log(process.env);


	result.send('Testing');
});

/**
 * export app
 */
export default app;

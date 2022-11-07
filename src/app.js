/**
 * directory alieases 
 * and environment config
 */
require('module-alias/register');
var dotenv = require('dotenv');
dotenv.config({ path: './.env' });
dotenv.config({ path: './secret.env' });
//dotenv.config({ path: './firebase.env' });

/**
 * App Variables
 * //note must be done before any classes/modules
 * //note but must be done after module-alias and dotenv
 */
var constants = require(__dirname + '/constants.inc');

/**
 * init express/app
 */
var express = require("express");
var cors = require("cors");
var helmet = require("helmet");
const app = express();

//requiring path and fs modules
const path = require('path');
const fs = require('fs');

/**
 * Required External Modules
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
var db = require(__src + '/classes/db.mongo/index');

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
 * handle /calendar routes
 */
app.post('/calendar/update_url', (request, result) => {
	var route = require("~routes/calendar-update_url");
	route.request = request;
	route.result = result;
	route.run();
});

/**
 * //debug output some basic content
 */
app.get('/', (request, result) => {

/**
 * insert new entry
 */
let tmp = new Date().toString();
tmp = `INSERT INTO "store" ("unique_hash", "json") VALUES ('test', '{"test": "` + tmp + `"}');`;

db.query();

/**
 * output something
 */
result.send('TESTING!!!');

/**
 * done function
 */
});

/**
 * export app
 */
module.exports = app;

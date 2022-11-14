/**
 * directory alieases 
 * and environment config
 */
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
const microservices = require(__src + '/classes/microservices/index.js');
microservices.is_valid_hash();

/**
 * database setup
 */
var db = require(__src + '/classes/db.mongo/index');
db.connect();

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
    'secret': process.env.ENVIRONMENT + process.env.SESSION_SECRET, 
    'cookie': { maxAge: 3600000, secure: false, httpOnly: true }, 
}));

/**
 * authenticate user
 * //future this can be used auth every request
 * from here: https://stackoverflow.com/questions/13106300/node-js-express-execute-hook-on-every-http-request-before-app-get-and-app-po
 */
app.post('*', function(request, result, next){
	request['session']['user_id'] = 'MySampleUserID';//debug swap this out when firebase auth is done
	next();
});

/**
 * handle /calendar routes
 */
require(__src + '/routes/calendar_routes')(app);


/**
 * handle /microservice routes
 */
require(__src + '/routes/update_routes')(app);

/**
 * //debug output some basic content
 */
app.get('/', (request, result) => {

/**
 * insert new entry
 *
let tmp = new Date().toString();
tmp = `INSERT INTO "store" ("unique_hash", "json") VALUES ('test', '{"test": "` + tmp + `"}');`;

db.connect();

const calendar_schema = require('./mongo_models/calendar');
const new_cal = new calendar_schema({
	'url': 'NEW_TEST', 
	'free_busy_only': true, 
});
new_cal.save(function(error, document) {
	if (error) console.error(error);
	console.log(document);
});

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

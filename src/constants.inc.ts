const sqlite3 = require('sqlite3');

/**
 * //class for server constants and other
 */
class constants {

/*
 * set data store
 */
//todo public $separator = DIRECTORY_SEPARATOR;
server_url='';
error_url='/error/index.php';
cookie='';
docroot='';
webroot='/';
mail_api_key='';
remote_addr='';
internal_hash='';
old_internal_hash='';
npm_script='';
day={};
settings={};
style={};

/**
 * //function to construct
 */
constructor() {

/**
 * setup docroot
 */
if (
	(typeof process != 'undefined')
	&&
	(typeof process['mainModule'] != 'undefined')
	&&
	(typeof process['mainModule']['path'] == 'string')
	&&
	(process['mainModule']['path'])
){
	this.docroot = process['mainModule']['path'] + '/';
}

/**
 * setup npm script (watch, build, dev, serve, etc)
 */
if (
	(typeof process != 'undefined')
	&&
	(typeof process['env'] != 'undefined')
	&&
	(typeof process['env']['npm_lifecycle_event'] == 'string')
	&&
	(process['env']['npm_lifecycle_event'])
){
	this.npm_script = process['env']['npm_lifecycle_event'];
}

/**
 * confirm we have required .env vars
 */
if (
	(typeof process == 'undefined')
	||
	(typeof process['env'] == 'undefined')
	||
	(typeof process['env']['ENVIRONMENT'] != 'string')
	||
	(!process['env']['ENVIRONMENT'])
	||
	(typeof process['env']['SECRET'] != 'string')
	||
	(!process['env']['SECRET'])
	||
	(typeof process['env']['SESSION_SECRET'] != 'string')
	||
	(!process['env']['SESSION_SECRET'])
){
	console.log('Environment variables are not set.');
	console.log(process['env']['SESSION_SECRET']);
	console.log(process['env']['SECRET']);
	console.log(process['env']['ENVIRONMENT']);
	process.exit(1);
}


/**
 * done //function
 */
}


test(){
	console.log(this);

/**
 * done //function
 */
}

/**
 * done //class
 */
}

/**
 * export
 */
module.exports = new constants;

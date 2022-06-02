import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config();

var crypto = require('crypto');

/*
 * //class to handle CSRF security tokens
 */
class csrf {

/*
 * init data store
 */
public debug_timestamp=0;
private secret: string = '';
private internal_hash: string = '';
private internal_hash_old: string = '';
private short_term_urls: Object = {
	'/register': 1, 
	'/login': 1, 
	'/reset': 1
};

/*
 * //function to construct
 */
constructor() {

//debug
let debug_timestamp = new Date();
this.debug_timestamp = debug_timestamp.getHours() + ':' + debug_timestamp.getMinutes();

/*
 * get/init SECRET
 */
if (
	(typeof process != 'object')
	||
	(typeof process.env != 'object')
	||
	(typeof process.env.SECRET == 'undefined')
	||
	(!process.env.SECRET)
){
	console.log(typeof process.env.SECRET);
	console.log('Environment SECRET is required but is not available.');
	return false;
}
this.secret = process.env.SECRET + ' ' + process.env.ENVIRONMENT

/*
 * generate internal hash for microservice calls
 */
this.generate_internal_hash();

/*
 * done //function
 */
}

/*
 * //function to check/set internal hash
 */
generate_internal_hash(){

/*
 * init
 */
let date_object = new Date();

/*
 * create current signature
 */
let date = date_object.getUTCHours() + '-' + date_object.getUTCDate();
let signature = crypto.createHash('md5').update(date + this.secret).digest('hex');

/*
 * check/confirm current token already exists and is correct
 * and if so return success
 */
if (
	(this.internal_hash)
	&&
	(this.internal_hash.indexOf('.' + signature) > -1)
	&&
	(this.internal_hash_old)
){
	return this.internal_hash;
}

/*
 * set/reset current token
 */
if (
	(!this.internal_hash)
	||
	(this.internal_hash.indexOf('.' + signature) == -1)
){
	this.internal_hash = crypto.createHash('md5').update(signature + this.secret).digest('hex') + '.' + signature;
}

/*
 * create OLD signature
 */
date = (date_object.getUTCHours()-1) + '-' + date_object.getUTCDate();
signature = crypto.createHash('md5').update(date + this.secret).digest('hex');

/*
 * set/reset OLD token
 */
if (
	(!this.internal_hash_old)
	||
	(this.internal_hash_old.indexOf('.' + signature))
){
	this.internal_hash_old = crypto.createHash('md5').update(signature + this.secret).digest('hex') + '.' + signature;
}

/*
 * //debug confirm how often we're creating a new hash
 */
console.log('New internal hash generated: ' + this.internal_hash);

/*
 * return success
 */
return this.internal_hash;

/*
 * done //function
 */
}

test_func(pointer='') {
console.log(pointer);
return true;
}

/*
 * check provided CSRF token against expected
 */


/*
 * done //class
 */
}

csrf = new csrf;
export default csrf;

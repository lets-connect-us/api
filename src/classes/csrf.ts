import 'module-alias/register';
import * as dotenv from "dotenv";
dotenv.config();

var crypto = require('crypto');

/**
 * //class to handle CSRF security tokens
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
class csrf {

/**
 * init data store
 */
public debug_timestamp=0;
public date: string = '';
private secret: string = '';
private internal_hash: string = '';
private internal_hash_old: string = '';
private short_term_urls: Object = {
	'/register': 1, 
	'/login': 1, 
	'/reset': 1
};

/**
 * //function to construct
 */
constructor() {

/**
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

/**
 * generate internal hash for microservice calls
 */
this.generate_internal_hash();

/**
 * done //function
 */
}

/**
 * //function to check/set internal hash
 */
generate_internal_hash(){

/**
 * init
 */
let date_object = new Date();
let date: string = '';

/*
 * store date object for other hashes
 */
date = date_object.getUTCFullYear() + date_object.getUTCMonth() + date_object.getUTCDate() + date_object.getUTCDay();
if (
	(!this.date)
	||
	(this.date != date)
){
	this.date = date;
}

/**
 * create current signature
 */
date = date_object.getUTCHours() + this.date;
let signature = crypto.createHash('md5').update(date + this.secret).digest('hex');

/**
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

/**
 * set/reset current token
 */
if (
	(!this.internal_hash)
	||
	(this.internal_hash.indexOf('.' + signature) == -1)
){
	this.internal_hash = crypto.createHash('md5').update(signature + this.secret).digest('hex') + '.' + signature;
}

/**
 * create OLD signature
 */
date = (date_object.getUTCHours()-1) + this.date;
signature = crypto.createHash('md5').update(date + this.secret).digest('hex');

/**
 * set/reset OLD token
 */
if (
	(!this.internal_hash_old)
	||
	(this.internal_hash_old.indexOf('.' + signature))
){
	this.internal_hash_old = crypto.createHash('md5').update(signature + this.secret).digest('hex') + '.' + signature;
}

/**
 * //debug confirm how often we're creating a new hash
 */
console.log('New internal hash generated: ' + this.internal_hash);

/**
 * return success
 */
return this.internal_hash;

/**
 * done //function
 */
}

/**
 * //function to get a short_term token
 * //note we use this for register, login, reset, etc where the user is not yet authenticated
 */
get_short_term(
	values=''
){

/**
 * confirm we have data
 */
if (
	(typeof values != 'object')
	||
	(typeof values['ip_addr'] == 'undefined')
	||
	(typeof values['browser_token'] == 'undefined')
	||
	(typeof values['url'] == 'undefined')
	||
	(!values['url'])
	||
	(!this.short_term_urls[ values['url'] ])
){
	//todo server log
	return false;
}

/**
 * init
 */
let date_object = new Date();

/**
 * create token signature as the expiry timestamp (20 minutes) of the token.
 */
let signature = date_object.getTime();
signature = Math.round(signature/1000);
signature = signature + 900; //20 minutes, the time the user has to complete the form

/*
 * create token payload
 */
let payload = this.get_short_term_payload({
	'url' : values['url'], 
	'ip_addr' : values['ip_addr'], 
	'signature' : signature, 
});

/**
 * multiply signature
 * //note stored as 2.75x the signature just to make it look slightly less like a timestamp
 */
signature = signature * 2.75;

/**
 * return token success
 */
return payload + '.' + signature;


/**
 * done //function
 */
}

/**
 * //function to get a short_term token payload
 */
get_short_term_payload(values=''){

/**
 * confirm we have a signature
 */
if (
	(typeof values['url'] != 'string')
	||
	(!values['url'])
	||
	(typeof values['ip_addr'] != 'string')
	||
	(!values['ip_addr'])
	||
	(typeof values['signature'] == 'undefined')
	||
	(!values['signature'])
){
	return false;
}

/**
 * create payload
 */
let payload = values['url'] + values['ip_addr'] + values['signature'] + this.secret;
payload = crypto.createHash('md5').update(payload).digest('hex');

/**
 * return success
 */
return payload;

/**
 * done //function
 */
}

/**
 * check provided CSRF token against expected
 */

/**
 * done //class
 */
}

csrf = new csrf;
export default csrf;

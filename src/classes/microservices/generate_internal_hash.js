/**
 * import external modules
 */
var crypto = require('crypto');

/**
 * //function to check/set internal hash
 */
function generate_internal_hash(){

/**
 * init
 * and get date
 */
let date_object = new Date();
let date = date_object.getUTCFullYear() + '' + date_object.getUTCMonth() + '' + date_object.getUTCDate() + '' + date_object.getUTCDay();

/**
 * store/update date object for other hashes
 */
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
let signature = crypto.createHash('md5').update(this.date + this.secret).digest('hex');

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


module.exports = generate_internal_hash;

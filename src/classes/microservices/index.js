/**
 * import external modules
 */

//leftoff writing this.


/**
 * //class to store and handle sanitize
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
class microservices {

/**
 * init data store
 */
date = '';
secret = '';
internal_hash = '';
internal_hash_old = '';

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
generate_internal_hash = require('./generate_internal_hash');

/**
 * //function to check if a hash is valid
 */
is_valid_hash = require('./is_valid_hash');

/**
 * done //class
 */
}

module.exports = new microservices;


/**
 * //function to confirm a provided_hash hash is valid
 */
function is_valid_hash(provided_hash=''){

/**
 * confirm we have a hash
 */
if (
	(typeof provided_hash != 'string')
	||
	(!provided_hash)
){
	console.log('No hash provided_hash.');
	return false;
}

/**
 * check for dev
 */
if (
	(typeof process.env == 'object')
	&&
	(typeof process.env.ENVIRONMENT == 'string')
	&&
	(process.env.ENVIRONMENT)
	&&
	(process.env.ENVIRONMENT.indexOf('dev') > -1)
	&&
	(provided_hash == 'postman')
){
	return provided_hash;
}

/**
 * get current internal hash
 */
let internal_hash = this.generate_internal_hash();
if (!internal_hash){
	console.log('Failed to get internal hash.');
	return false;
}

/**
 * compare current hash
 */
if (
	(provided_hash != internal_hash)
	&&
	(provided_hash != this.internal_hash_old)
){
	console.log('Provided hash does not match.');
	return false;
}

/**
 * return success
 */
return provided_hash;

/**
 * done //function
 */
}

module.exports = is_valid_hash;

/**
 * require external modules
 */

/**
 * //function to validate inputs
 */
function validate(){

/**
 * default return and next function for if there's an error
 */
this.next = () => {
	return this.exec_db();
}

/**
 * ensure we have something to validate first
 */
if (
	(typeof this.request != 'object')
	||
	(typeof this.request['body'] != 'object')
){
	this.return['message']['error'].push('A required field is not set.');
	this.next = require(__src + '/classes/default_route_return');
}

/**
 * validate unique_id
 */
if (
	(typeof this.request['body']['unique_id'] != 'string')
	||
	(!this.request['body']['unique_id'])
	||
	(this.request['body']['unique_id'].length < 30)
	||
	(this.request['body']['unique_id'].length > 250)
){
	this.return['message']['error'].push('A required field is not set.');
	this.next = require(__src + '/classes/default_route_return');
}

/**
 * import validate
 * //note we do it here so the class doesn't collide with the function name since its scoped within the function
 */
var validate = require(__src + '/classes/validate/index');

/**
 * validate url
 */
if (!validate.url({
		'url' : this.request['body']['url'], 
		'strict_url': 1, 
		'strict_port': 1, 
	})
){
	this.return['message']['error'].push('Calendar URL is not valid.');
	this.next = require(__src + '/classes/default_route_return');
}

/**
 * validate free_busy_only
 * //note this can be required here since it defaulted in sanitize.js
 * //note should never happen since sanitize.js sanitizes then defaults
 */
if (typeof this.request['body']['free_busy_only'] == 'undefined'){
	this.return['message']['error'].push('Free/Busy only is not valid.');
	this.next = require(__src + '/classes/default_route_return');
}
if (
	(this.request['body']['free_busy_only'] != 1)
	&&
	(this.request['body']['free_busy_only'] != 0)
){
	this.return['message']['error'].push('Free/Busy only is not valid.');
	this.next = require(__src + '/classes/default_route_return');
}

/**
 * exec next function
 */
return this.next();

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = validate;

/**
 * require external modules
 */
const get_and_parse_ics = require('./get_and_parse_ics');
const microservices=require(__src + '/classes/microservices/index');

/**
 * //function to validate inputs
 */
function validate(values={}){

/**
 * default return and next function for if there's an error
 */
values.next = get_and_parse_ics;

/**
 * ensure we have something to validate first
 */
if (
	(typeof values['request'] != 'object')
	||
	(typeof values['request']['body'] != 'object')
){
	values['return']['message']['error'].push('A required field is not set.');
	values.next = require(__src + '/classes/default_route_return');
}

/**
 * validate internal_hash
 */
if (!microservices.is_valid_hash(values['request']['body']['hash'])){
	values['return']['message']['error'].push('A required field is not set.');
	values.next = require(__src + '/classes/default_route_return');
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
		'url' : values['request']['body']['url'], 
		'strict_url': 1, 
		'strict_port': 1, 
	})
){
	values['return']['message']['error'].push('Calendar URL is not valid.');
	values.next = require(__src + '/classes/default_route_return');
}

/**
 * validate free_busy_only
 * //note this can be required here since it defaulted in sanitize.js
 * //note should never happen since sanitize.js sanitizes then defaults
 */
if (typeof values['request']['body']['free_busy_only'] == 'undefined'){
	values['return']['message']['error'].push('Free/Busy only is not valid.');
	values.next = require(__src + '/classes/default_route_return');
}
if (
	(values['request']['body']['free_busy_only'] != 1)
	&&
	(values['request']['body']['free_busy_only'] != 0)
){
	values['return']['message']['error'].push('Free/Busy only is not valid.');
	values.next = require(__src + '/classes/default_route_return');
}

/**
 * exec next function
 */
return values.next(values);

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = validate;

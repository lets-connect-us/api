/**
 * require external modules
 */
const exec_db=require('./exec_db');

/**
 * //function to validate inputs
 */
function validate(values={}){

/**
 * default return and next function for if there's an error
 */
values.next = exec_db;

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
 * validate calendar_id
 */
if (
	(typeof values['request']['body']['calendar_id'] != 'string')
	||
	(!values['request']['body']['calendar_id'])
	||
	(values['request']['body']['calendar_id'].length < 30)
	||
	(values['request']['body']['calendar_id'].length > 250)
){
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

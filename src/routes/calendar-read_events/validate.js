/**
 * require external modules
 */
const exec_db_get_ids=require('./exec_db_get_ids');

/**
 * //function to validate inputs
 */
function validate(values={}){

/**
 * default return and next function for if there's an error
 */
values.next = exec_db_get_ids;

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
 * validate link_id
 */
if (
	(typeof values['request']['body']['link_id'] != 'string')
	||
	(!values['request']['body']['link_id'])
	||
	(values['request']['body']['link_id'].length < 30)
	||
	(values['request']['body']['link_id'].length > 250)
){
	values['return']['message']['error'].push('A required field is not set.');
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

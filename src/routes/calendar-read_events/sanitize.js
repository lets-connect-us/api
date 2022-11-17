/**
 * import external modules
 */
const crypto = require('crypto');
const validate=require('./validate');

/**
 * //function to sanitize args
 */
function sanitize (values={}) {

/**
 * default next()
 */
values.next = validate;

/**
 * import sanitize
 * //note we do it here so the class doesn't collide with the function
 */
var sanitize = require(__src + '/classes/sanitize/index');

/**
 * //input_required POST[link_id]
 */
if (
	(typeof values['request']['body']['link_id'] != 'string')
	||
	(values['request']['body']['link_id'] != sanitize.alphanumeric(values['request']['body']['link_id']))
){
	values['return']['message']['error'].push('The share link ID is required but is not set.');
	values.next = require(__src + '/classes/default_route_return');
}

/**
 * check for required vars now that we've sanitized them
 * no point going further if a necessary vars are not set
 */
if (!values['request']['body']['link_id']){
	values['return']['message']['error'].push('A required field is not set.');
	values.next = require(__src + '/classes/default_route_return');
}

/**
 * return validate
 */
return values.next(values);

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = sanitize;

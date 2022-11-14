/**
 * import external modules
 */
const microservices = require(__src + '/classes/microservices/index');
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
 * //input_required POST[url]
 * //future maybe ping the url and confirm the result is valid iCal?
 */
values['request']['body']['url'] = sanitize.url(values['request']['body']['url']);

/**
 * //input_optional POST[free_busy_only]
 * default to 1 if not set so we default to secure (less data)
 */
values['request']['body']['free_busy_only'] = values['request']['body']['free_busy_only'] + 'junk';
if (values['request']['body']['free_busy_only'] == '0junk'){
	values['request']['body']['free_busy_only'] = 0;
}else {
	values['request']['body']['free_busy_only'] = 1;
}

/**
 * //input_optional POST[hash]
 */
if (
	(typeof values['request']['body']['hash'] != 'string')
	||
	(!values['request']['body']['hash'])
){
	values['return']['message']['error'].push('A required field is not set.');
	values.next = require(__src + '/classes/default_route_return');
}

/**
 * check for required vars now that we've sanitized them
 * no point going further if a necessary vars are not set
 */
if (
	(!values['request']['body']['url'])
	||
	(typeof values['request']['body']['free_busy_only'] == 'undefined')
	||
	(!values['request']['body']['hash'])
){
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

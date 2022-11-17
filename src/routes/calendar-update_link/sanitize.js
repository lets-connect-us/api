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
 * input_required POST[calendar_ids]
 * //note we do this before link_id so we know its in the right format
 */
if (
	(typeof values['request']['body']['calendar_ids'] == 'object')
	&&
	(values['request']['body']['calendar_ids'])
){
	values['request']['body']['calendar_ids'] = Object.values(values['request']['body']['calendar_ids']);
}
if (
	(typeof values['request']['body']['calendar_ids'] != 'string')
	||
	(!values['request']['body']['calendar_ids'])
){
	values['request']['body']['calendar_ids']='';
}
values['request']['body']['calendar_ids'] = values['request']['body']['calendar_ids'].replace(/,/g, '-');
values['request']['body']['calendar_ids'] = sanitize.alphanumeric(values['request']['body']['calendar_ids']);
values['request']['body']['calendar_ids'] = values['request']['body']['calendar_ids'].replace(/,,|\-/g, ',');
if (
	(typeof values['request']['body']['calendar_ids'] != 'string')
	||
	(!values['request']['body']['calendar_ids'])
){
	values['return']['message']['error'].push('Calendar IDs are required for this calendar but are not set.');
	values.next = require(__src + '/classes/default_route_return');
}
while (values['request']['body']['calendar_ids'].indexOf(',,') != -1){
	values['request']['body']['calendar_ids'] = values['request']['body']['calendar_ids'].replace(/,,/g, ',');
}

/**
 * //input_optional POST[link_id]
 * if not set then we create a new entry
 * //leftoff can we create here or do we have to wait until insert and allow DB to return?
 */
if (
	(typeof values['request']['body']['link_id'] != 'string')
	||
	(!values['request']['body']['link_id'])
){
	values['request']['body']['link_id'] = 
		values['request']['session']['user_id'] +
		'-' +
		crypto.createHash('md5').update(values['request']['session']['user_id'] + values['request']['body']['calendar_ids']).digest("hex");
}
values['request']['body']['link_id'] = sanitize.alphanumeric(values['request']['body']['link_id']);
if (
	(typeof values['request']['body']['link_id'] != 'string')
	||
	(!values['request']['body']['link_id'])
){
	values['return']['message']['error'].push('A link ID is required but is not set.');
	values.next = require(__src + '/classes/default_route_return');
}

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
 * input_optional POST[name]
 */
values['request']['body']['name'] = sanitize.short_text(values['request']['body']['name']);

/**
 * input_optional POST[notes]
 * //future do we want to allow for HTML here?
 */
values['request']['body']['notes'] = sanitize.all_text(values['request']['body']['notes']);

/**
 * check for required vars now that we've sanitized them
 * no point going further if a necessary vars are not set
 */
if (
	(!values['request']['session']['user_id'])
	||
	(!values['request']['body']['link_id'])
	||
	(typeof values['request']['body']['free_busy_only'] == 'undefined')
	||
	(!values['request']['body']['calendar_ids'])
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

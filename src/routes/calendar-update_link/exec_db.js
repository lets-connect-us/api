/**
 * import external modules
 */
const mongoose = require('mongoose');
const output = require('./output');

/**
 * //function to execute DB query(s)
 */
async function exec_db(values={}){

/**
 * default next()
 */
values.next = output;

/**
 * get link schema
 */
const link_schema = require(__src + '/mongo_models/link');

/**
 * update existing data
 */
let new_link = {
	'link_id': values['request']['body']['link_id'], 
	'user_id': values['request']['session']['user_id'], 
	'free_busy_only': values['request']['body']['free_busy_only'], 
	'calendar_ids': values['request']['body']['calendar_ids'], 
	'name': values['request']['body']['name'], 
	'notes': values['request']['body']['notes'], 
};
let filter = {
	'link_id': values['request']['body']['link_id'], 
}
var tmp = await link_schema.findOneAndUpdate(
	filter, 
	new_link 
);

/**
 * insert if update failed
 * and get data model
 * and set success message
 */
let success_message = 'Existing share link successfully updated.';
if (
	(typeof tmp != 'object')
	||
	(!tmp)
){

	new_link = new link_schema(new_link);

	var tmp = await new_link.save();

	success_message = 'New share link successfully added.';
}


/**
 * confirm success
 */
if (
	(typeof tmp != 'object')
	||
	(typeof tmp['link_id'] != 'string')
	||
	(tmp['link_id'] != values['request']['body']['link_id'])
){
	values['return']['message']['error'].push('Failed to save changes.');
	values.next = require(__src + '/classes/default_route_return');
}else {
	values['return'].message['success'].push(success_message);
}

/**
 * return values.next()
 */
return values.next(values);

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = exec_db;

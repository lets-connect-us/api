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
 * get calendar schema
 */
const calendar_schema = require(__src + '/mongo_models/calendar');

/**
 * update existing data
 */
let new_cal = {
	'user_id': values['request']['session']['user_id'], 
	'calendar_id': values['request']['body']['calendar_id'], 
	'url': values['request']['body']['url'], 
	'free_busy_only': values['request']['body']['free_busy_only'], 
};
let filter = {
	'calendar_id': values['request']['body']['calendar_id'], 
}
var tmp = await calendar_schema.findOneAndUpdate(
	filter, 
	new_cal 
);

/**
 * insert if update failed
 * and get data model
 * and set success message
 */
let success_message = 'Existing calendar URL successfully updated.';
if (
	(typeof tmp != 'object')
	||
	(!tmp)
){

	new_cal = new calendar_schema({
		'user_id': values['request']['session']['user_id'], 
		'calendar_id': values['request']['body']['calendar_id'], 
		'url': values['request']['body']['url'], 
		'free_busy_only': values['request']['body']['free_busy_only'], 
	});

	var tmp = await new_cal.save();

	success_message = 'New calendar URL successfully added.';
}


/**
 * confirm success
 */
if (
	(typeof tmp != 'object')
	||
	(typeof tmp['calendar_id'] != 'string')
	||
	(tmp['calendar_id'] != values['request']['body']['calendar_id'])
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

/**
 * import external modules
 */
const mongoose = require('mongoose');
const event_schema = require(__src + '/mongo_models/event');

/**
 * //function to execute DB query(s)
 */
async function add_to_db(values={}){

/**
 * update existing data
 */
let event_data = {
	'event_id': values['event_id'], 
	'calendar_id': values['calendar_id'], 
	'user_id': values['user_id'], 
	'timestamp_start': values['timestamp_start'], 
	'timestamp_end': values['timestamp_end'], 
	'summary': values['summary'], 
	'description': values['description'], 
	'uid': values['uid'], 

};
let filter = {
	'event_id': values['event_id'], 
}
var tmp = await event_schema.findOneAndUpdate(
	filter, 
	event_data 
);

/**
 * insert if update failed
 * and get data model
 * and set success message
 */
if (
	(typeof tmp != 'object')
	||
	(!tmp)
){
	event_data = new event_schema(event_data);

	var tmp = await event_data.save();

}

console.log(tmp);//debug

/**
 * confirm success
 */
if (
	(typeof tmp != 'object')
	||
	(typeof tmp['event_id'] != 'string')
	||
	(tmp['event_id'] != values['event_id'])
	||
	(tmp['calendar_id'] != values['calendar_id'])
){
	console.log('Error adding event to database.');
}

/**
 * return values.next()
 */
return values;

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = add_to_db;

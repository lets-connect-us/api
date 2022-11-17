/**
 * import external modules
 */
const mongoose = require('mongoose');
const output = require('./output');

/**
 * //function to execute DB query(s)
 */
async function exec_db_get_events(values={}){

/**
 * default next()
 */
values.next = output;

/**
 * get calendar schema
 */
const event_schema = require(__src + '/mongo_models/event');

/**
 * update existing data
 */
let filter = {
	'calendar_id': values['link_data']['calendar_ids'].split(','), 
	'timestamp_end': { $gt: ((Date.now()/1000) - 3600) }
}
var tmp = await event_schema.find(filter).select('-_id -__v');

console.log(tmp);


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
module.exports = exec_db_get_events;

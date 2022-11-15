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
 * build filter and find/select data
 */
let filter = {
	'user_id': values['request']['session']['user_id'], 
}
var tmp = await calendar_schema.find(filter).select('-_id -__v');


/**
 * confirm success
 */
if (
	(typeof tmp != 'object')
	||
	(typeof tmp[0]['user_id'] != 'string')
	||
	(tmp['user_id'] != values['request']['body']['user_id'])
){
	values['return']['message']['error'].push('Failed to get list of URLs.');
	values.next = require(__src + '/classes/default_route_return');
}
values['return']['result']=tmp;

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

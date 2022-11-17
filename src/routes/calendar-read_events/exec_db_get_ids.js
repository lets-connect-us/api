/**
 * import external modules
 */
const mongoose = require('mongoose');
const exec_db_get_events = require('./exec_db_get_events');

/**
 * //function to execute DB query(s)
 */
async function exec_db_get_ids(values={}){

/**
 * default next()
 */
values.next = exec_db_get_events;

/**
 * get calendar schema
 */
const link_schema = require(__src + '/mongo_models/link');

/**
 * update existing data
 */
let filter = {
	'link_id': values['request']['body']['link_id'], 
}
var tmp = await link_schema.find(filter).select('-_id -__v');

/**
 * confirm success
 */
if (
	(typeof tmp != 'object')
	||
	(typeof tmp[0] != 'object')
	||
	(!tmp[0])
	||
	(typeof tmp[0]['link_id'] != 'string')
	||
	(tmp[0]['link_id'] != values['request']['body']['link_id'])
	||
	(typeof tmp[0]['calendar_ids'] != 'string')
	||
	(!tmp[0]['calendar_ids'])
){
	values['return']['message']['error'].push('Failed to get calendar events.');
	values.next = require(__src + '/classes/default_route_return');
}else{
while (tmp[0]['calendar_ids'].indexOf(',,') != -1){
	tmp[0]['calendar_ids'] = tmp[0]['calendar_ids'].replace(/,,/g, ',');
}
values['link_data']=tmp[0];
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
module.exports = exec_db_get_ids;

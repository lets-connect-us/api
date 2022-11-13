/**
 * import external modules
 */
var mongoose = require('mongoose');

/**
 * //function to execute DB query(s)
 */
async function exec_db(){

/**
 * get calendar model
 */
const calendar_schema = require(__src + '/mongo_models/calendar');

/**
 * init new model
 */
let new_cal = new calendar_schema({
	'user_id': this.request['session']['user_id'], 
	'unique_id': this.request['body']['unique_id'], 
	'url': this.request['body']['url'], 
	'free_busy_only': this.request['body']['free_busy_only'], 
});

/**
 * check if already exists
 */
var tmp = await calendar_schema.findOne(
	{'unique_id': this.request['body']['unique_id']}, 
);
if (tmp){
	new_cal = new calendar_schema(tmp);
}

/**
 * add new/changed data
 */
new_cal['url'] = this.request['body']['url'];
new_cal['free_busy_only'] = this.request['body']['free_busy_only'];

/**
 * save changes
 */
new_cal.save(function(error, document) {
	if (error) console.error(error);
	console.log(document);
});

console.log(new_cal.update);

/**
 * //debug
 */
this.result.send('TEST');
return true;

/**
 * done //function
 */
}

module.exports = exec_db;

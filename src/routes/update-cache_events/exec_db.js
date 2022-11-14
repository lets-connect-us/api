/**
 * import external modules
 */
const mongoose = require('mongoose');
const output = require('./output');
const add_to_db = require('./add_to_db');

/**
 * //function to execute DB query(s)
 */
async function exec_db(values={}){

/**
 * default next()
 */
values.next = output;

/**
 * loop through values
 */
values['event_count']=0;
for (var key in values['events']){
	add_to_db(values['events'][ key ]);
	values['event_count']++;
}

/**
 * run next
 */
return values.next(values);

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

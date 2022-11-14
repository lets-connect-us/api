/**
 * Required External Modules
 */
const mongoose = require('mongoose');

/**
 * build mongo schema
 */
const event_schema = new mongoose.Schema({
	'event_id': { type: String, 'required': true, 'unique': true }, //hash of user+UID?
	'user_id': String, 
	'uid': String, 
	'calendar_id': String, 
	'summary': String, 
	'timestamp_start' : Number, 
	'timestamp_end': Number, 
	'description': String, 
});

/**
 * export
 */
module.exports = mongoose.model('event', event_schema);

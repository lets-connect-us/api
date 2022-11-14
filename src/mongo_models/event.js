/**
 * Required External Modules
 */
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

/**
 * build mongo schema
 */
const event_schema = new mongoose.Schema({
	'event_id': { type: String, 'required': true, 'unique': true }, //hash of user+UID?
	'user_id': String, 
	'calendar_id': String, 
	'summary': Boolean, 
	'timestamp_start' : Number, 
	'timestamp_end': Number, 
});

/**
 * export
 */
module.exports = mongoose.model('event', event_schema);

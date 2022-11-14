/**
 * Required External Modules
 */
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

/**
 * build mongo schema
 */
const calendar_schema = new mongoose.Schema({
//	'calendar_id': { type: String, 'required': true, 'unique': true }, //hash of user+url?
	'calendar_id': { type: String }, //hash of user+url?
	'user_id': String, 
	'url': String, 
	'free_busy_only': Boolean, 
	'name' : String, 
	'notes': String, 
});

/**
 * export
 */
module.exports = mongoose.model('calendar', calendar_schema);

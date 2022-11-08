/**
 * Required External Modules
 * for some reason sqlite has to be required here rather than in the class
 * for some reason bluebird has to be required here rather than in the class
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendar_schema = new Schema({
	'unique_id': String, //hash of user+url?
	'user_id': String, 
	'url': String, 
	'free_busy_only': Boolean, 
});

/**
 * export
 */
module.exports = mongoose.model('calendar', calendar_schema);

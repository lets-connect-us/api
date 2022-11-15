/**
 * Required External Modules
 */
const mongoose = require('mongoose');

/**
 * build mongo schema
 */
const link_schema = new mongoose.Schema({
	'link_id': { type: String }, //hash of user+urls
	'user_id': String, 
	'calendar_ids': String, 
	'free_busy_only': Boolean, 
	'name' : String, 
	'notes': String, 
});

/**
 * export
 */
module.exports = mongoose.model('link', link_schema);

/**
 * //class to store and handle sanitize
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
module.exports = {
	'db_file' : '', 
	'connections' : {}, 
	'connect' : require('./connect'), 
	'load_settings_from_file' : require('./load_settings_from_file'), 


/**
 * done //class
 */
}

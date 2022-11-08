/**
 * //class to store and handle sanitize
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
module.exports = {
	'connection' : {}, 
	'connect' : require('./connect'), 

/**
 * //function to exec an SQL query
 */
	'query' : require('./query'), 

/**
 * done //class
 */
}

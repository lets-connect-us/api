/**
 * //class to store and handle sanitize
 * //note everything in /routes is loaded on each route/request and passes around a values{} object with all necessary data
 * SOLID!
 */
class update_url {

/**
 * //function to init to perform any init before run
 */
	'init' = require(__src + '/classes/default_route_init'); 

/**
 * //function to start/run on request
 */
	'run' = require('./run'); 

/**
 * //function to check required/optional inputs
 */
	'check_input_arguments' = require(__src + '/classes/check_input_arguments'); 

/**
 * //function to start/run on request
 */
	'exec_db' = require('./exec_db'); 

/**
 * //function to start/run on request
 */
	'output' = require('./output'); 

/**
 * done //class
 */
}

module.exports = update_url;

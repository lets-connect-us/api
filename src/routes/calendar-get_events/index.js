/**
 * //class to store and handle sanitize
 * //note everything in /routes is loaded on each route/request and passes around a values{} object with all necessary data
 * SOLID!
 */
class get_events {

current_timestamp=0;

/**
 * //function to init to perform any init before run
 */
	'init' = require('./init'); 

/**
 * //function to start/run on request
 */
	'run' = require('./run'); 

/**
 * //function to check required/optional inputs
 */
	'check_input_arguments' = require(__src + '/classes/check_input_arguments'); 

/**
 * //function to sanitize inputs
 */
	'sanitize' = require('./sanitize'); 

/**
 * //function to sanitize inputs
 */
	'get_and_parse_ics' = require('./get_and_parse_ics'); 



/**
 * done //class
 */
}

module.exports = get_events;

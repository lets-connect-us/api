/**
 * //class to store and handle sanitize
 * //note everything in /routes is loaded on each route/request and thus stores request/user specific data
 * SOLID!
 */
module.exports = {
/**
 * init object store
 */
	'request' : {}, 
	'result' : {}, 

/**
 * //function to init to perform any init before run
 */
	'init' : require(__src + '/classes/default_route_init'), 

/**
 * //function to start/run on request
 */
	'run' : require('./run'), 

/**
 * //function to check required/optional inputs
 */
	'check_input_arguments' : require(__src + '/classes/check_input_arguments'), 

/**
 * //function to sanitize inputs
 */
	'sanitize': require('./sanitize'), 


/**
 * //function to validate inputs
 */
	'validate': require('./validate'), 


/**
 * //function to execute DB
 */
	'exec_db': require('./exec_db'), 

/**
 * done //class
 */
}

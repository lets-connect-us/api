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
 * //function to sanitize inputs
 */
	'sanitize': require('./sanitize'), 

/**
 * done //class
 */
}

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
	'init' : require('./init'), 

/**
 * //function to start/run on request
 */
	'run' : require('./run'), 


/**
 * done //class
 */
}

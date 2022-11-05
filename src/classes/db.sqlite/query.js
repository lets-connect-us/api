/**
 * Required External Modules
 * for some reason sqlite has to be required here rather than in the class
 * for some reason bluebird has to be required here rather than in the class
 */

/**
 * //function to connect to an sqlite file
 */
function query(values={}){

/**
 * confirm we have data
 */
if (typeof values != 'object'){
	console.log('Incorrect arguments provided.');
	return false;
}

/**
 * get DB connection
 */
if (typeof values['connection'] == 'string'){
	
}

/**
 * done //function
 */
}

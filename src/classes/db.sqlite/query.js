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
if (this.connections[ values['connection'] ]){
	values['connection'] = this.connections[ values['connection'] ];
}
}
console.log(values);

/**
 * get DB connection
 */
if (typeof values['query'] != 'string'){
	console.log('Invalid DB query provided.');
	return false;
}

/**
 * done //function
 */
}

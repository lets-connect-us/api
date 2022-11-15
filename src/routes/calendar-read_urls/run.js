/**
 * import external modules
 */
const exec_db = require('./exec_db');

/**
 * //function to start/run route
 */
function run(values={}){

/**
 * default next()
 */
values.next = exec_db;

/**
 * ensure we have required args
 */
if (
	(typeof values != 'object')
	||
	(typeof values['request'] != 'object')
	||
	(typeof values['request']['body'] != 'object')
	||
	(typeof values['result'] != 'object')
	||
	(typeof values['result'].send != 'function')
){
	console.log(require(__src + '/classes/default_error_message'));
	return false;
}

/**
 * verify/validate request.body, result.send, etc
 */
//todo

/**
 * check input arguments
 * //note if a user provides extra arguments or not the required arguments then the request is likely malicious
 */
if (!this.check_input_arguments({
		'provided': Object.keys(values['request']['body']), 
		'required': [], //future if not admin then force users own user_id
		'optional': [], //future other search args
	})
){
	var tmp = require(__src + '/classes/default_error_message');
	values['return']['message']['error'].push(tmp);
	values.next = require(__src + '/classes/default_route_return');
}

/**
 * return & run next function
 */
return values.next(values);

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = run;

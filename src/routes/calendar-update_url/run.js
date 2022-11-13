/**
 * import external modules
 */

/**
 * //function to start/run route
 */
function run(){

/**
 * ensure we have required args
 */
if (
	(typeof this != 'object')
	||
	(typeof this.request != 'object')
	||
	(typeof this.result != 'object')
	||
	(typeof this.result.send != 'function')
){
	console.log(require(__src + '/classes/default_error_message'));
	process.exit();
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
		'provided': Object.keys(this.request['body']), 
		'required': ['url', 'unique_id'], 
		'optional': ['free_busy_only'], 
	})
){
	var tmp = require(__src + '/classes/default_error_message');
	this.return['message']['error'].push(tmp);
	this.result.send(this.return);
	return true;
}

/**
 * return & run next function
 */
return this.sanitize();

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = run;

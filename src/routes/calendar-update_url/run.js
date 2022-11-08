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

/**
 * //function to re-use for a default init for every route
 */
function default_route_return(values={}){

/**
 * confirm we are an object
 */
if (typeof this != 'object'){
	console.log('This is not a class/object');
	return false;
}

/**
 * default return
 */
if (
	(typeof values['return'] != 'object')
	||
	(!values['return'])
	||
	(!Object.keys(values['return']).length)
){
	values['return'] = require(__src + '/classes/default_return_object');
}

/**
 * if we have result.send() then do that
 * otherwise default to just return true
 */
if (
	(typeof values == 'object')
	&&
	(typeof values['result'] == 'object')
	&&
	(typeof values['result'].send == 'function')
){
	values['result'].send(values['return']);
} else {
	console.log('send_function() is not a function.');
	return false;
}

/**
 * return success
 */
return true;


/**
 * done //function
 */
}

module.exports = default_route_return;

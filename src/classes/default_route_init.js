/**
 * //function to re-use for a default init for every route
 */
function default_route_init(values={}) {

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
values['return'] = {
	'success': 0, 
	'result': {}, 
	'message': {
		'error': [], 
		'info': [], 
		'success': [], 
	}
}

/**
 * default next function
 * if we have result.send() then do that
 * otherwise default to just return true
 */
if (typeof values.next != 'function'){
if (typeof values['result'].send == 'function'){
	values.next = () => {
		values['result'].send(values['return']);
	}
} else {
	values.next = () => {
		return true;
	}
}
}

/**
 * return success
 */
return values;


/**
 * done //function
 */
}

module.exports = default_route_init;

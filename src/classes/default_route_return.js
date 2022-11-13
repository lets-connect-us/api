/**
 * //function to re-use for a default init for every route
 */
function default_route_return() {

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
	(typeof this.return != 'object')
	||
	(!this.return)
	||
	(!Object.keys(this.return).length)
){
	this.return = require(__src + '/classes/default_return_object');
}

/**
 * if we have result.send() then do that
 * otherwise default to just return true
 */
if (typeof this.result.send == 'function'){
	this.result.send(this.return);
} else {
	console.log('result.send() is not a function.');
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

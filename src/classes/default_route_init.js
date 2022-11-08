/**
 * //function to re-use for a default init for every route
 */
function default_route_init() {

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
 * default next function
 * if we have result.send() then do that
 * otherwise default to just return true
 */
if (typeof this.next != 'function'){
if (typeof this.result.send == 'function'){
	this.next = () => {
		this.result.send(this.return);
	}
} else {
	this.next = () => {
		return true;
	}
}
}


/**
 * done //function
 */
}

module.exports = default_route_init;

/**
 * import external modules
 */
var mongoose = require('mongoose');

/**
 * //function to start/run route
 */
function init(){

/**
 * ensure we have a next function
 */
if (typeof (this.next != 'function')){
	this.next = function(){
		console.log('NEXT!');
	}
}

console.log(this);

this.next();

this.result.send(this.return);

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = init;

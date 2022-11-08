

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
 * dne //function
 */
}

/**
 * export
 */
module.exports = init;

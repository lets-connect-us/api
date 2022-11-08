/**
 * import external modules
 */
const crypto = require('crypto');

/**
 * //function to sanitize args
 */
function sanitize () {

/**
 * default return and next function for if there's an error
 */
this.next = () => {
	this.result.send(this.return);
	return true;
}

/**
 * import sanitize
 * //note we do it here so the class doesn't collide with the function
 */
var sanitize = require(__src + '/classes/sanitize/index');

/**
 * //input_required POST[url]
 * //future maybe ping the url and confirm the result is valid iCal?
 */
this.request['body']['url'] = sanitize.url(this.request['body']['url']);

/**
 * //input_optional POST[free_busy_only]
 * default to 1 if not set so we default to secure (less data)
 */
this.request['body']['free_busy_only'] = this.request['body']['free_busy_only'] + 'junk';
if (this.request['body']['free_busy_only'] == '0junk'){
	this.request['body']['free_busy_only'] = 0;
}else {
	this.request['body']['free_busy_only'] = 1;
}

/**
 * //input_optional POST[unique_id]
 * if not set then we create a new entry
 */
if (
	(typeof this.request['body']['unique_id'] != 'string')
	||
	(!this.request['body']['unique_id'])
){
	this.request['body']['unique_id'] = 
		this.request['session']['user_id'] +
		'-' +
		crypto.createHash('md5').update(this.request['body']['url'] + this.request['body']['free_busy_only']).digest("hex");
}
this.request['body']['unique_id'] = sanitize.alphanumeric(this.request['body']['unique_id']);
if (
	(typeof this.request['body']['unique_id'] != 'string')
	||
	(!this.request['body']['unique_id'])
){
	this.return['message']['error'].push('A URL unique ID is required but is not set.');
	this.result.send(this.return);
}

/**
 * check for required vars now that we've sanitized them
 * no point going further if a necessary vars are not set
 */
if (
	(!this.request['session']['user_id'])
	||
	(!this.request['body']['url'])
	||
	(typeof this.request['body']['free_busy_only'] == 'undefined')
	||
	(!this.request['body']['unique_id'])
){
	this.return['message']['error'].push('A required field is not set.');
	this.result.send(this.return);
}

return this.next();

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = sanitize;

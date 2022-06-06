import 'module-alias/register';

import { Request, Response, NextFunction } from "express";

import output from "~classes/output";
import microservice from "~classes/microservice";
import csrf from "~classes/csrf";
import sanitize from "~classes/sanitize";

/**
 * //class to handle API /register end-point
 */
class register {

/**
 * init data store
 */
public us_email: String = '';

/**
 * //function to construct
 */
constructor(
	values=''
) {

/**
 * init session
 */
if (
	(typeof values == 'object')
	&&
	(typeof values['request'] != 'undefined')
	&&
	(values['request'])
){
	output.init_session(values['request']);
}

/**
 * done //function
 */
}

/**
 * //function to be the primary entry point
 */
entry_point(
	values=''
){

/**
 * //debug
 * 
values['request_store']['result'].send('TEST');
return false;
*/

let security_token = values['request_store']['request']['body']['security_token'];
security_token = sanitize.jwt(values['request_store']['request']['body']['security_token']);

/**
 * confirm security token is valid
 */
let valid = microservice.call({
	'url': '/read/short_term/valid', 
	'request_data': {
		'security_token': csrf.internal_hash, 
		'security_token_provided': security_token, 
		'url': '/register', 
		'ip_addr': values['request_store']['request'].socket['remoteAddress'] || values['request_store']['request'].headers['cf-connecting-ip'] || '', 
	}
});
valid.then(function(response){
	console.log(response['data']);
});

values['request_store']['result'].send('TEST');
return false;

/**
 * return success
 *
console.log(valid);
return valid;
return values['request']['body'];


/**
 * done //function
 */
}

/**
 * //function to return a result to the query
 */
return(values=''){

/**
 * done //function
 */
}

/**
 * done //class
 */
}

export default register;

import 'module-alias/register';

import { Request, Response, NextFunction } from "express";

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
constructor() {

/**
 * done //function
 */
}

/**
 * //function to be the primary entry point
 */
entry_point(
	values=''
) {

let test = values['request']['body']['security_token'];
test = sanitize.short_term(values['request']['body']['security_token']);

/**
 * confirm security token is valid
 */
let valid = microservice.call({
	'url': '/read/short_term/valid', 
	'request_data': {
		'csrf': 'test', 
	}, 
	'next_function': function(response){
		console.log(response);
	}
});
console.log(valid);

return values['request']['body'];


/**
 * done //function
 */
}

/**
 * done //class
 */
}

export default register;

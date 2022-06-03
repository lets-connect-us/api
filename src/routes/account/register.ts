import 'module-alias/register';

import { Request, Response, NextFunction } from "express";

import microservice from "~classes/microservice";
import csrf from "~classes/csrf";

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

this['us_email'] = values['body']['us_email'];
this['pazz'] = values['body']['pazz'];

/**
microservice.call({
	'url' : 'test', 
});
*/

console.log(values['request']['body']);
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

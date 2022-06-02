import 'module-alias/register';

import { Request, Response, NextFunction } from "express";

import microservice from "~classes/microservice";
import csrf from "~classes/csrf";

/**
 * //class to handle API /csrf/short-term end-point
 */
class short_term {

/*
 * init data store
 */

/*
 * //function to construct
 */
constructor() {

/*
 * done //function
 */
}

/*
 * //function to be the primary entry point
 */
entry_point(
	values=''
) {


/**
 * //leftoff:
 * finishing writing short term CSRF
 * 	should include IP and url.
 * 	"signature" is expiry timestamp
 * Verify/validate short term CSRF
 * 

console.log(values['request']['body']);
return values['request']['body'];

/*
 * done //function
 */
}

/*
 * done //class
 */
}

export default short_term;

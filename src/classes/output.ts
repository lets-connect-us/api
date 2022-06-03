var session = require('express-session');

/**
 * //class to store and handle output
 */
class output {

/**
 * init data storage
 */
public defaul_messages={
	
}
public success: int = 0;
public message: Object = {
	'error': [], 
	'info': [], 
	'success': [], 
}
public result=''; //note we specifically do not specify a type for result since it can be string, array, object, etc


/**
 * //function to construct 
 */
constructor(
	values=''
){

/**
 * done //function
 */
}

/**
 * init session
 */
init_session(
	request=''
){

/*
 * confirm we have data
 */
if (typeof request != 'object'){
	//leftoff write and use len[gth] here too
	return false;
}

/**
 * init/reset session response object
 */
if (
	(typeof request == 'object')
	&&
	(typeof request.session == 'object')
	&&
	(typeof request.session['response'] != 'object')
){
	request.session['response'] = {
		'success': 0, 
		'result': '', 
		'security_token': '', 
		'next_url': '', 
		'message': {}, 
	};
}
request.session['response']['success']=0;
request.session['response']['result']='';
request.session['response']['message']={
	'error': [], 
	'info': [], 
	'success': [], 
};

/*
 * set/reset security token and response
 */
if (
	(typeof request == 'object')
	&&
	(typeof request.session == 'object')
	&&
	(typeof request.session['response'] == 'object')
){
if (
	(typeof request.session['response']['security_token'] == 'undefined')
	||
	(!request.session['response']['security_token'])
){
	request.session['response']['security_token'] = '';
}
if (
	(typeof request.session['response']['next_url'] == 'undefined')
	||
	(!request.session['response']['next_url'])
){
	request.session['response']['next_url'] = '';
}
}


/**
 * return success
 */
return true;

/**
 * done //function
 */
}

/**
 * //function to return JSON output to the browser
 */
send(
	values=''
){


/**
 * return standardized object
 */
return ({
	'sucess': this.success, 
	'message': this.message, 
	'result': this.result, 
});

/**
 * done //function
 */
}

test_func(pointer='') {
console.log(pointer);
return true;
}

/**
 * done //class
 */
}

output = new output;
export default output;

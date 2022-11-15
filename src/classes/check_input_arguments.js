/**
 * //function to re-use for a default init for every route
 */
function check_input_arguments(values={
	'provided': [], 
	'required': [], 
	'optional': []
}) {

/**
 * ensure we have something
 */
if (typeof values != 'object'){
	return false;
}
if (typeof values['provided'] != 'object'){
	return false;
}
if (
	(typeof values['provided'].length == 'undefined')
	||
	(!values['provided'].length)
){
	values['provided']=[];
}
if (
	(typeof values['required'] == 'undefined')
	||
	(typeof values['required'].length == 'undefined')
	||
	(!values['required'].length)
){
	values['required']=[];
}
if (
	(typeof values['optional'] == 'undefined')
	||
	(typeof values['optional'].length == 'undefined')
	||
	(!values['optional'].length)
){
	values['optional']=[];
}

/**
 * remove security_token that is always allowed
 */
if (values['provided'].indexOf('security_token') > -1){
	delete values['provided'][ values['provided'].indexOf('security_token') ];
}
if (values['required'].indexOf('security_token') > -1){
	delete values['required'][ values['required'].indexOf('security_token') ];
}

/**
 * remove csrf that is always allowed
 */
if (values['provided'].indexOf('csrf') > -1){
	delete values['provided'][ values['provided'].indexOf('csrf') ];
}
if (values['required'].indexOf('csrf') > -1){
	delete values['required'][ values['required'].indexOf('csrf') ];
}


/**
 * loop through provided checking against required/optional
 */
for (const key in values['provided']){

/**
 * check against required
 */
if (
	(values['required'].length)
	&&
	(values['required'].indexOf(values['provided'][ key ]) != -1)
){
	delete values['required'][ values['required'].indexOf(values['provided'][ key ]) ];
	delete values['required'][ key ];
	continue;
}

/**
 * check against optional
 */
if (
	(values['optional'].length)
	&&
	(values['optional'].indexOf(values['provided'][ key ]) != -1)
){
	delete values['optional'][ values['optional'].indexOf(values['provided'][ key ]) ];
	delete values['provided'][ key ];
	continue;
}

/**
 * done for loop
 */
}

/**
 * check if extra arg provided
 */
if (values['provided'].join('').length > 0){
	console.log('Extra input arguments provided.');
	return false;
}

/**
 * check if required inputs are met
 */
if (values['required'].join('').length > 0){
	console.log('Required input arguments are not met.');
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

module.exports = check_input_arguments;

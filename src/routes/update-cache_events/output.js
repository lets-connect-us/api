/**
 * import external modules
 */

/**
 * //function to execute DB query(s)
 */
function output(values={}){

/**
 * build and return success
 */
values['return']['success']=1;
values['return']['result'] = {
	'calendar_id': values['request']['body']['calendar_id'], 
	'user_id': values['request']['body']['user_id'], 
	'event_count': values['event_count'], 
};

/**
 * return success
 */
values['result'].send(values['return']);
return true;

/**
 * done //function
 */
}

module.exports = output;

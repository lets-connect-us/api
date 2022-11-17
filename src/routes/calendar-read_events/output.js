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
values['return']['result'] = values['request']['body'];

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

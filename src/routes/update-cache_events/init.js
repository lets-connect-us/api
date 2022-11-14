/**
 * import external modules
 */

/**
 * //function to start/run route
 */
function init(values={}){

/**
 * run default init
 */
var tmp = require(__src + '/classes/default_route_init');
values = tmp(values);

/**
 * get current timestamp to skip old events
 */
let current_timestamp = Date.now();
values['current_timestamp'] = this.current_timestamp = Math.round(current_timestamp / 1000);


/**
 * return & run next function
 */
return values;

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = init;

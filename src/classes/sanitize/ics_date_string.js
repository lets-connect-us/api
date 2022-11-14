/**
 * import external modules
 */

/**
 * //function to parse the long, annoying date format
 */
function ics_date_string(string=''){

/**
 * confirm we have something to parse
 */
if (
	(typeof string != 'string')
	||
	(!string)
	||
	(string.indexOf('T') == -1)
){
	return false;
}

/**
 * split into date/time
 */
let parts = string.split('T');
let date_object={
	'date':'', 
	'time':''
}

/**
 * format date
 */
parts[0] = parts[0].split('');
date_object['date'] = parts[0][0] + parts[0][1] + parts[0][2] + parts[0][3] + '-' + parts[0][4] + parts[0][5] + '-' + parts[0][6] + parts[0][7];

/**
 * format time
 */
parts[1] = parts[1].split('');
date_object['time'] = parts[1][0] + parts[1][1] + ':' + parts[1][2] + parts[1][3] + ':' + parts[1][4] + parts[1][5] + parts[1][6];

/**
 * create date object
 */
date_object = new Date(date_object['date'] + ' ' + date_object['time']);

/**
 * return success
 */
return date_object

/**
 * done //function
 */
}

module.exports = ics_date_string;

/**
 * import external modules
 */
const ical2json = require("ical2json");
const mongoose = require('mongoose');
const output = require('./output');
const sanitize = require(__src + '/classes/sanitize/index');

/**
 * //function to execute DB query(s)
 */
async function get_and_parse_ics(values={}){

/**
 * default next()
 */
values.next = (values) => {
	console.log('//todo write next function');
	console.log(values['return']);
}

/**
 * init return result object
 */
values['return']['result']={};

const response = await fetch(values['request']['body']['url']);
let body = await response.text();
body = ical2json.convert(body);
//leftoff if body != 'object' or != [VCALENDAR]

/**
 * loop through events and parse
 */
for (let key in body['VCALENDAR'][0]['VEVENT']){
	if (
		(typeof body['VCALENDAR'][0]['VEVENT'][ key ]['DTSTART'] == 'undefined')
		&&
		(typeof body['VCALENDAR'][0]['VEVENT'][ key ]['DTEND'] == 'undefined')
	)
	{
		continue;
	}
	
	var tmp = {
		'_id' : body['VCALENDAR'][0]['VEVENT'][ key ]['UID'], 
		'user_id': '', 
		'calendar_id': '', 
		'timestamp_start' : sanitize.ics_date_string(body['VCALENDAR'][0]['VEVENT'][ key ]['DTSTART']), 
		'timestamp_end' : sanitize.ics_date_string(body['VCALENDAR'][0]['VEVENT'][ key ]['DTEND']), 
		'summary' : body['VCALENDAR'][0]['VEVENT'][ key ]['SUMMARY'] || 'busy', 
		'description' : body['VCALENDAR'][0]['VEVENT'][ key ]['DESCRIPTION'] || 'busy', 
	}
	if (tmp['timestamp_start']){
		tmp['timestamp_start'] = Math.round(tmp['timestamp_start'].valueOf() / 1000);
	}
	if (tmp['timestamp_end']){
		tmp['timestamp_end'] = Math.round(tmp['timestamp_end'].valueOf() / 1000);
	}
	if (tmp['timestamp_end'] < values['current_timestamp']){
		continue;
	}
	values['return']['result'][ tmp['_id'] ] = tmp;
}

/**
 * return values.next()
 */
return values.next(values);

/**
 * done //function
 */
}

/**
 * export
 */
module.exports = get_and_parse_ics;

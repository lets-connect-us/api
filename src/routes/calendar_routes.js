/**
 * import external modules
 */

module.exports = function(app){

/**
 * /calendar/update_url
 */
app.post('/calendar/update_url', (request, result) => {

/**
 * init route
 */
let route = require(__src + '/routes/calendar-update_url');
route = new route();
var tmp = {
	'request': request, 
	'result': result, 
	'next':{}, 
	'return': {}, 
}
tmp = route.init(tmp);

/**
 * run route
 * and output error on failure
 */
if (!route.run(tmp)){
	var tmp = require(__src + '/classes/default_return_object');
	tmp['message']['error'].push('Something went terribly wrong :(');
	result.send(tmp);
}

/**
 * done route
 */
});


/**
 * /calendar/get_events
 */
app.post('/calendar/read_events', (request, result) => {

/**
 * init route
 */
let route = require(__src + '/routes/calendar-read_events');
route = new route();
var tmp = {
	'request': request, 
	'result': result, 
	'next':{}, 
	'return': {}, 
}
tmp = route.init(tmp);

/**
 * run route
 * and output error on failure
 */
if (!route.run(tmp)){
	var tmp = require(__src + '/classes/default_return_object');
	tmp['message']['error'].push('Something went terribly wrong :(');
	result.send(tmp);
}

/**
 * done route
 */
});


/**
 * /calendar/update_link
 */
app.post('/calendar/update_link', (request, result) => {

/**
 * init route
 */
let route = require(__src + '/routes/calendar-update_link');
route = new route();
var tmp = {
	'request': request, 
	'result': result, 
	'next':{}, 
	'return': {}, 
}
tmp = route.init(tmp);

/**
 * run route
 * and output error on failure
 */
if (!route.run(tmp)){
	var tmp = require(__src + '/classes/default_return_object');
	tmp['message']['error'].push('Something went terribly wrong :(');
	result.send(tmp);
}

/**
 * done route
 */
});


/**
 * /calendar/get_events
 */
app.post('/calendar/read_urls', (request, result) => {

/**
 * init route
 */
let route = require(__src + '/routes/calendar-read_urls');
route = new route();
var tmp = {
	'request': request, 
	'result': result, 
	'next':{}, 
	'return': {}, 
}
tmp = route.init(tmp);

/**
 * run route
 * and output error on failure
 */
if (!route.run(tmp)){
	var tmp = require(__src + '/classes/default_return_object');
	tmp['message']['error'].push('Something went terribly wrong :(');
	result.send(tmp);
}

/**
 * done route
 */
});

/**
 * done //function
 */
}

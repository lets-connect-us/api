/**
 * import external modules
 */

module.exports = function(app){

/**
 * /microservices/update/cache_events
 */
app.post('/microservices/update/cache_events', (request, result) => {

/**
 * init route
 */
let route = require(__src + '/routes/update-cache_events');
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

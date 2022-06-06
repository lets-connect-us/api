import 'module-alias/register';
import * as dotenv from "dotenv";

/**
 * import classes
 */
import output from "~classes/output";
import classes_request_store from "~classes/request_store";

/**
 * import routes
 */
import short_term_valid from "~routes/read/short_term.valid";
let short_term = new short_term_valid;

/**
 * //class//module to setup /read API routes
 */
module.exports = (app) => {

/*
 * short_term/valid
 */
app.post('/read/short_term/valid', (request, result) => {
	
	let request_store = new classes_request_store({
		'request': request, 
		'result': result,
	});
	
	short_term.entry_point({
		'request_store': request_store
	});
});

/**
  app.use('/status', status);
  app.use('/users', users);
  // app.use('/users', validateAuth.checkIfAuthenticated, getData.getGeoip, users);
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
*/

};

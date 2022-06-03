import 'module-alias/register';
import * as dotenv from "dotenv";

/**
 * import classes
 */
import output from "~classes/output";

/**
 * //class//module to setup /read API routes
 */
module.exports = (app) => {

/*
 * short_term/valid
 */
app.all('/read/short_term/valid', (request, result) => {
	result.send(output.send());
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

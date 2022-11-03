const fs = require('fs');

/**
 * //class to get/exec migrations
 * //leftof cleaning up this class and potentially move to db.sqlite?
 */
class migrate_database{

connection={};
sql_queries=[];

/**
 * //function to construct
 */
run(values={}){

this.connection = values['connection'];
this.get_query();

/**
 * done //function
 */
}

get_query(){
/**
 * init allowed_tags from settings file
 */
this.sql_queries = require('~src/migrate_database-calendars');
this.exec_queries();

/**
 * done //function
 */
}

exec_queries(){

/**
 * loop through array of queries
 */
for(const query of this.sql_queries) {
this.connection.exec(query, (err) => {
	let skip_error=0;
	if (
		(err) 
		&&
		(typeof err == 'object')
		&&
		(typeof err['message'] == 'string')
		&&
		(err['message'].indexOf('duplicate column'))
	){
		skip_error=1;
	}
	if (
		(err)
		&&
		(skip_error)
	){
		console.log('Error running database migration', err);
	}
});
}

/**
 * done for loop
 */
}

/**
 * done //class
 */
}

module.exports = new migrate_database;

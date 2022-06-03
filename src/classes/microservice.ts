import axios from 'axios';
import csrf from '~classes/csrf';


/**
 * //class to call a microservice
 */
class microservice {

/**
 * init data store
 */
public base_url = 'http://127.0.0.1:8000/';
public then_function={};
protected last_result = {};
protected success=0;

/**
 * //function to construct
 */
constructor() {

/**
 * done //function
 */
}

/**
 * //function to execute a call
 */
async call(
	values=''
){

/**
 * reset success
 */
this.success=0;

/**
 * confirm we have data
 */
if (
	(typeof values != 'object')
	||
	(typeof values['url'] == 'undefined')
	||
	(!values['url'])
){
	console.log('No URL provided to microservices.call:');
	console.log(values);
	return false;
}
let url = this.base_url + values['url'];
url = url.replace(/[//]+/gi, "/");
url = url.replace(':/', '://');


/**
 * add request data if we don't have it
 */
let request_data={};
if (
	(typeof values == 'object')
	&&
	(typeof values['request_data'] != 'undefined')
){
	request_data = values['request_data'];
}

/**
 * try Axios API call
 */
try {
	const data = axios.post(
		url,
		request_data,
		{headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},},
	);
	return data
	.then(function (response) {
		console.log(response);
	});

} catch (error) {

	if (axios.isAxiosError(error)) {
		console.log('error message: ', error.message);
		return error.message;
	} else {
		console.log('unexpected error: ', error);
		return 'An unexpected error occurred';
	}

/**
 * done try/catch
 */
}

/**
 * done //function
 */
}

/**
 * done //class
 */
}

microservice = new microservice;
export default microservice;

/**
 * 
import axios from 'axios';

type CreateUserResponse = {
  name: string;
  job: string;
  id: string;
  createdAt: string;
};

async function createUser() {
  try {
    // 👇️ const data: CreateUserResponse
    const { data } = await axios.post<CreateUserResponse>(
      'https://reqres.in/api/users',
      { name: 'John Smith', job: 'manager' },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    console.log(JSON.stringify(data, null, 4));

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      // 👇️ error: AxiosError<any, any>
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

createUser();
*/

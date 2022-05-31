import axios from 'axios';


/**
 * //class to call a microservice
 */
class microservice {

/*
 * init data store
 */
public base_url = 'http://127.0.0.1:8000/';
public then_function={};
protected last_result = {};
protected success=0;

/*
 * //function to construct
 */
constructor() {

/*
 * done //function
 */
}

/*
 * //function to execute a call
 */
call(
	values=''
){
console.log(values);
return true;

/*
 * done //function
 */
}

/*
 * done //class
 */
}

microservice = new microservice;
export default microservice;

/**
 * 
import axios from 'axios';

type User = {
  id: number;
  email: string;
  first_name: string;
};

type GetUsersResponse = {
  data: User[];
};

async function getUsers() {
  try {
    // const data: GetUsersResponse
    const { data, status } = await axios.get<GetUsersResponse>(
      'https://reqres.in/api/users',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    console.log(JSON.stringify(data, null, 4));

    //"response status is: 200"
    console.log('response status is: ', status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

getUsers();

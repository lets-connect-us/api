import axios from 'axios';
/**
 * //class to call a microservice
 * //note everything in /classes is a singleton. Nothing request/user data is stored in singletons, only enviro/config data
 * SOLID!
 */
class db {


/**
 * //function to construct
 */
constructor() {

let new_db = new sqlite3.Database('./test.db', (err) => {
	if (err) {
		console.log('Could not connect to database', err)
	} else {
		console.log('Connected to database')
	}
});

/**
 * done //function
 */
}

/**
 * done //class
 */
}


/**
 * init and export
 */
export default db;

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

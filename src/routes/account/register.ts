import 'module-alias/register';
import microservice from "@classes/microservice";

import test from "@classes/test";

class register {
  public server;

  constructor() {
	  
  }

  test_func() {
    console.log('test');
    console.log(globalThis.server);
    return true;
  }
}

export default register;

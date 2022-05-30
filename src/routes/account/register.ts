import 'module-alias/register';
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

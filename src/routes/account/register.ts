import 'module-alias/register';
import test from "@classes/test";

class register {
  public server;

  constructor() {
	  
  }

  test_func() {
    console.log(test.test_func(this));
    return true;
  }
}

export default register;

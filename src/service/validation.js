class Validation {
    regexs= {
        email : /^[\w\d]{1,}[.\\\-#!]?[\w\d]{1,}@[\w\d]{1,}.[a-z]{2,3}.?([a-z]{2})?$/,
        password : /^(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@#!$%^&*()_]{8,})[A-Za-z0-9]+?[@#!$%^&*()_][A-Za-z0-9]{1,}?$/,
    } 

    getRegexs = () => {
        return this.regexs;
    }
        
  validateInput = (input, pattern) => {
    if (pattern.test(input)) {
      console.log(input);
      return false;
    }
    return true;
  };
}

export default Validation;

class Validation {
  regexs = {
    email: /^[\w\d]{1,}[.\\\-#!]?[\w\d]{1,}@[\w\d]{1,}.[a-z]{2,3}.?([a-z]{2})?$/,
    name: /^[A-Z]{1}[a-z]{2,15}$/,
    password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@#!$%^&*()_]{8,})[A-Za-z0-9]+?[@#!$%^&*()_][A-Za-z0-9]{1,}?$/,
  };

  getRegexs = () => {
    return this.regexs;
  };

  validateInput = (input, pattern) => {
    if (pattern.test(input)) {
      return false;
    }
    return true;
  };

  checkIfSame = (firstInput, secondInput, statusOfFirst, statusOfSecond) => {
    if (firstInput === secondInput && !statusOfFirst && !statusOfSecond) {
      return true;
    }
    return false;
  };
}

export default Validation;

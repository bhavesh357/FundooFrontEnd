class Auth {

  isAuthenticated() {
    console.log(localStorage.getItem("userId"));
    return localStorage.getItem("userId") !== null;
  }
}

export default new Auth();

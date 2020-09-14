class Auth {

  isAuthenticated() {
    return localStorage.getItem("userId") !== null;
  }
}

export default new Auth();

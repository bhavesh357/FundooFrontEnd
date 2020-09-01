import Axios from "axios";

const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/user";

class ServiceCalls {

  callPost(url,user,callback) {
    Axios.post(
      url,
      user
    )
      .then((response) => {
        callback(response.data.message);
      })
      .catch((error) => {
        callback(error.response.data.error.message);
      });
  }

  resetWithdata(user, callback) {
    this.callPost(baseUrl+"/reset",user,callback);
  }

  signUpWithdata(user,callback) {
    this.callPost(baseUrl+"/userSignUp",user,callback);
  }

  signInWithData(user,callback) {
    this.callPost(baseUrl+"/login",user,callback);
  }

  resetWithData(user, token, callback) {
    this.callPost(baseUrl+"/reset-password?access_token=" + token,user,callback);
  }
}

export default ServiceCalls;

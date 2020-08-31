import Axios from "axios";

class ServiceCalls {
  resetWithdata(user, callback) {
    Axios.post(
      "http://fundoonotes.incubation.bridgelabz.com/api/user/reset",
      user
    )
      .then((response) => {
        callback(response.data.message);
      })
      .catch((error) => {
        callback(error.response.data.error.message);
      });
  }

  signUpWithdata(user,callback) {
    Axios.post(
      "http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",
      user
    )
      .then((response) => {
        callback(response.data.data.message);
      })
      .catch((error) => {
        // handle error
        callback(error.response.data.error.message);
      });
  }

  signInWithData(user,callback) {
    Axios.post(
      "http://fundoonotes.incubation.bridgelabz.com/api/user/login",
      user
    )
      .then((response) => {
        callback("Login Successful");
      })
      .catch((error) => {
        callback(error.response.data.error.message);
      });
  }

  resetWithData(user, token, callback) {
    Axios.post(
      "http://fundoonotes.incubation.bridgelabz.com/api/user/reset-password?access_token=" +
        token,
      user
    )
      .then((response) => {
        let messageSnackbar =
          response.status === 204 ? "Successfully resetted the password" : "";
        callback(messageSnackbar);
      })
      .catch((error) => {
        callback(error.response.data.error.message);
      });
  }
}

export default ServiceCalls;

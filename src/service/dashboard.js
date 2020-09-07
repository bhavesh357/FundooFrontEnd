import Axios from "axios";

const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/noteLabels";

class DashboardCalls {
  callGet(url, callback) {
    Axios.get(url)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  callPost(url, data, callback) {
    Axios.post(url, data)
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  addNewLabel(token, label, callback) {
    this.callPost(
      baseUrl + "?access_token=" + token,
      label,
      callback
    );
  }

  getAllLabels(token, callback) {
    this.callGet(baseUrl + "/getNoteLabelList?access_token=" + token, callback);
  }
}

export default DashboardCalls;

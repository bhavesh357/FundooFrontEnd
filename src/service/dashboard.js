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

  callDelete(url, callback) {
    Axios.delete(url)
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

  editLabel(token, label, callback) {
    this.callPost(
      baseUrl+"/"+label.id+"/updateNoteLabel?access_token=" + token,
      label,
      callback
    );
  }

  deleteLabel(token,id,callback ) {
    this.callDelete(
      baseUrl+"/"+id+"/deleteNoteLabel?access_token=" + token,
      callback
    )
  }

  getAllLabels(token, callback) {
    this.callGet(baseUrl + "/getNoteLabelList?access_token=" + token, callback);
  }
}

export default DashboardCalls;

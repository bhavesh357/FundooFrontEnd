import Axios from "axios";

const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/notes";

class NotesCalls {

  callPost(url,callback) {
    Axios.get(
      url
    )
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  getAllNotes(token,callback) {
    this.callPost(baseUrl+"/getNotesList?access_token=" + token,callback);
  }

}

export default NotesCalls;

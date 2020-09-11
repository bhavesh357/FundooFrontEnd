import Axios from "axios";

const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/notes";
const token  = localStorage.getItem("token");

class NotesCalls {

  callGet(url,callback) {
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

  callPost(url,data,callback) {
    Axios.post(
      url,
      data
    )
      .then((response) => {
        callback(response);
      })
      .catch((error) => {
        callback(error);
      });
  }

  getAllNotes(callback) {
    this.callGet(baseUrl+"/getNotesList?access_token=" + token,callback);
  }

  getArchivedNotes(callback) {
    this.callGet(baseUrl+"/getArchiveNotesList?access_token=" + token,callback);
  }

  getTrashedNotes(callback) {
    this.callGet(baseUrl+"/getTrashNotesList?access_token=" + token,callback);
  }

  pinUnpinNote(data,callback){
    this.callPost(baseUrl+"/pinUnpinNotes?access_token=" + token, data, callback)
  }

  addNotes(data,callback){
    this.callPost(baseUrl+"/addNotes?access_token=" + token, data, callback)
  }

  archiveNotes(data,callback){
    this.callPost(baseUrl+"/archiveNotes?access_token=" + token, data, callback)
  }

  deleteNotes(data,callback){
    this.callPost(baseUrl+"/trashNotes?access_token=" + token, data, callback)
  }

  updateNotes(data,callback){
    this.callPost(baseUrl+"/updateNotes?access_token=" + token, data, callback)
  }

}

export default NotesCalls;

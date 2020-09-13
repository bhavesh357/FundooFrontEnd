import Axios from "axios";

const baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/notes";


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

  getToken(){
    return localStorage.getItem("token");
  }

  getAllNotes(callback) {
    this.callGet(baseUrl+"/getNotesList?access_token=" + this.getToken(),callback);
  }

  getArchivedNotes(callback) {
    this.callGet(baseUrl+"/getArchiveNotesList?access_token=" + this.getToken(),callback);
  }

  getTrashedNotes(callback) {
    this.callGet(baseUrl+"/getTrashNotesList?access_token=" + this.getToken(),callback);
  }

  getReminderNotes(callback) {
    this.callGet(baseUrl+"/getReminderNotesList?access_token=" + this.getToken(),callback);
  }

  getNotesByLabel(label,callback) {
    this.callPost(baseUrl+"/getNotesListByLabel/"+label+"?access_token=" + this.getToken(),{},callback);
  }

  pinUnpinNote(data,callback){
    this.callPost(baseUrl+"/pinUnpinNotes?access_token=" + this.getToken(), data, callback)
  }

  addNotes(data,callback){
    this.callPost(baseUrl+"/addNotes?access_token=" + this.getToken(), data, callback)
  }

  archiveNotes(data,callback){
    this.callPost(baseUrl+"/archiveNotes?access_token=" + this.getToken(), data, callback)
  }

  changeColorNotes(data,callback){
    this.callPost(baseUrl+"/changesColorNotes?access_token=" + this.getToken(), data, callback)
  }

  deleteNotes(data,callback){
    this.callPost(baseUrl+"/trashNotes?access_token=" + this.getToken(), data, callback)
  }

  deleteNotesForever(data,callback){
    this.callPost(baseUrl+"/deleteForeverNotes?access_token=" + this.getToken(), data, callback)
  }

  addUpdateReminderNotes(data,callback){
    this.callPost(baseUrl+"/addUpdateReminderNotes?access_token=" + this.getToken(), data, callback)
  }

  removeReminderNotes(data,callback){
    this.callPost(baseUrl+"/removeReminderNotes?access_token=" + this.getToken(), data, callback)
  }

  updateNotes(data,callback){
    this.callPost(baseUrl+"/updateNotes?access_token=" + this.getToken(), data, callback)
  }

  addLabelNote(noteId,labelId,callback){
    this.callPost(baseUrl+"/"+noteId+"/addLabelToNotes/"+labelId+"/add?access_token="+ this.getToken(),{},callback);
  }

  removeLabelNote(noteId,labelId,callback){
    this.callPost(baseUrl+"/"+noteId+"/addLabelToNotes/"+labelId+"/remove?access_token="+ this.getToken(),{},callback);
  }

}

export default NotesCalls;

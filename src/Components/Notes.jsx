import React from "react";
import {
  Grid,
  Typography,
  Card,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  IconButton,
  List,
  CardHeader,
  CardActions,
  InputBase,
  Button,
} from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Note from "./Note";
import CheckNote from "./CheckNote";
import RoomIcon from "@material-ui/icons/Room";

import notesCalls from "./../Service/notes";

const NotesCalls = new notesCalls();

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewNote: false,
      newNoteTitle: "",
      newNoteDescription: "",
      isNewNotePinned: false,
      newNoteColor: "#ffffff",
    };
  }

  handleNewNote = () => {
    console.log("test");
    if (this.state.isNewNote) {
      NotesCalls.addNotes(
        {
          title: this.state.newNoteTitle,
          description: this.state.newNoteDescription,
          isPined: this.state.isNewNotePinned,
          color: this.state.newNoteColor,
          isArchived: false,
          labelIdList: [],
          reminder: "",
          collaberators: [],
        },
        (response) => {
          let message = "";
          if (response.status !== undefined) {
            this.props.reloadNotes();
          } else {
            console.log(response);
          }
        }
      );
    }
    this.setState({
      isNewNote: !this.state.isNewNote,
      newNoteTitle: "",
      newNoteDescription: "",
      isNewNotePinned: false,
    });
  };

  handlePinned = () => {
    this.setState({
      isNewNotePinned: !this.state.isNewNotePinned,
    });
  };

  rendorNote = (note) => {
    return note.noteCheckLists.length === 0 ? (
      <Note
        note={note}
        key={note.id}
        reloadNotes={this.props.reloadNotes}
      />
    ) : (
      <CheckNote
        note={note}
        key={note.id}
        reloadNotes={this.props.reloadNotes}
      />
    );
  }

  render() {
    let newNoteBig = (
      <Card className="new-note-big">
        <IconButton
          className="pin-button-new"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={this.handlePinned}
        >
          {this.state.isNewNotePinned ? (
            <RoomIcon className="menu-icon" />
          ) : (
            <RoomOutlinedIcon className="menu-icon" />
          )}
        </IconButton>

        <InputBase
          placeholder="Title"
          className="new-note-title-input"
          inputProps={{ "aria-label": "search" }}
          value={this.state.newNoteTitle}
          onChange={(e) => {
            this.setState({
              newNoteTitle: e.target.value,
            });
          }}
        />
        <InputBase
          placeholder="Take a Note..."
          className="new-note-text-input"
          inputProps={{ "aria-label": "search" }}
          value={this.state.newNoteDescription}
          onChange={(e) => {
            this.setState({
              newNoteDescription: e.target.value,
            });
          }}
        />
        <div className="new-note-buttons">
          <div className="new-note-action-button">
            <IconButton className="new-note-icon">
              <AddAlertOutlinedIcon />
            </IconButton>
            <IconButton className="new-note-icon">
              <PersonAddOutlinedIcon />
            </IconButton>
            <IconButton className="new-note-icon">
              <ColorLensOutlinedIcon />
            </IconButton>
            <IconButton className="new-note-icon">
              <CropOriginalIcon />
            </IconButton>
            <IconButton className="new-note-icon">
              <ArchiveOutlinedIcon />
            </IconButton>
            <IconButton className="new-note-icon">
              <MoreVertIcon />
            </IconButton>
            <IconButton disabled className="new-note-icon">
              <UndoIcon />
            </IconButton>
            <IconButton disabled className="new-note-icon">
              <RedoIcon />
            </IconButton>
          </div>
          <div className="new-note-close-button">
            <Button onClick={this.handleNewNote}>Close</Button>
          </div>
        </div>
      </Card>
    );
    let newNoteSmall = (
      <Card className="new-note-small">
        <InputBase
          placeholder="Take a Note..."
          className="new-note-input"
          inputProps={{ "aria-label": "search" }}
          onClick={this.handleNewNote}
          value={this.state.newNoteTitle}
          onChange={(e) => {
            this.setState({
              newNoteTitle: e.target.value,
            });
          }}
        />
        <div className="new-note-icons">
          <IconButton className="new-note-icon">
            <CheckBoxOutlinedIcon />
          </IconButton>
          <IconButton className="new-note-icon">
            <CropOriginalIcon />
          </IconButton>
        </div>
      </Card>
    );

    let noteList = this.props.notes.map((note) => {
      if(this.props.label === "archive"){
        if(note.isArchived && !note.isDeleted){
          return this.rendorNote(note);
        }else{
          return null;
        }
      } 
      if(this.props.label === "trash"){
        if(note.isDeleted ){
          return this.rendorNote(note);
        }else{
          return null;
        }
      }
      if (note.isPined) {
        return null;
      } if((note.isArchived && this.props.label !== "archive") || (note.isDeleted && this.props.label !=="trash")){
        return null;
      } else {
        return this.rendorNote(note);
      }
    });

    let noteListPinned = this.props.notes.map((note) => {
      if (!note.isPined) {
        return "";
      } else {
        return this.rendorNote(note);
      }
    });

    return (
      <Grid container className="note">
        <Grid item md={this.props.isDrawerOpen ? 8 : 6}>
          {this.props.label !== "archive" && this.props.label !== "trash"
            ? this.state.isNewNote
              ? newNoteBig
              : newNoteSmall
            : "" }
        </Grid>
        {!this.props.isPinned ? (
          ""
        ) : (
          <Grid
            item
            className="note-list"
            md={this.props.isDrawerOpen ? 12 : 10}
          >
            <Typography className="note-list-name">Pinned</Typography>
            <Grid container spacing={2} className="note-row">
              {noteListPinned}
            </Grid>
          </Grid>
        )}
        <Grid item className="note-list" md={this.props.isDrawerOpen ? 12 : 10}>
          {!this.props.isPinned ? (
            ""
          ) : (
            <Typography className="note-list-name">Others</Typography>
          )}
          <Grid container spacing={2} className="note-row">
            {noteList}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Notes;

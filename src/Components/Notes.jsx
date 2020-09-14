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
  Tooltip,
  Popper,
  Chip,
} from "@material-ui/core";

import ScheduleIcon from "@material-ui/icons/Schedule";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
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
import DateFnsUtils from "@date-io/date-fns";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Note from "./Note";
import CheckNote from "./CheckNote";
import RoomIcon from "@material-ui/icons/Room"; 

import notesCalls from "./../Service/notes";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { isBefore } from "date-fns";
import ColorPopper from "./ColorPopper";
import LabelPopper from "./LabelPopper";
import { map, remove } from "lodash";

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
      reminder: "",
      reminderDate: new Date(),
      reminderAnchorEl: null,
      reminderOpen: false,
      reminderId: undefined,
      colorAnchorEl: null,
      colorOpen: false,
      colorId: undefined,
      labels: [],
      labelAnchorEl: null,
        labelOpen: false,
        labelId: undefined,
    };
  }

  handleClickLabel = (e) => {
    if (this.state.labelAnchorEl === null) {
      this.setState({
        labelAnchorEl: e.currentTarget,
        labelOpen: !this.state.labelOpen,
        labelId: "label-popper",
      });
    } else {
      this.setState({
        labelAnchorEl: null,
        labelOpen: !this.state.labelOpen,
        labelId: undefined,
      });
    }
  };


  removeLabel = (id,label) => {
    let tempLabels = [...this.state.labels];
    console.log(tempLabels);
    remove(tempLabels,(n)=>{
      return n.id === id;
    });
    console.log(tempLabels);
  }

  addLabel = (id,label) => {
    let temp={
      label: label,
      isDeleted: false,
      id: id
    }
    this.setState({
      labels : [...this.state.labels, temp]
    })
  }

  addColor = (color) => {
    this.setState({
      newNoteColor: color,
    });
  };

  handleClickColor = (e) => {
    if (this.state.colorAnchorEl === null) {
      this.setState({
        colorAnchorEl: e.currentTarget,
        colorOpen: !this.state.colorOpen,
        colorId: "color-popper",
      });
    } else {
      this.setState({
        colorAnchorEl: null,
        colorOpen: !this.state.colorOpen,
        colorId: undefined,
      });
    }
  };

  handleNewNote = () => {
    console.log("test");
    if (this.state.isNewNote) {
      this.closePoppers();
      NotesCalls.addNotes(
        {
          title: this.state.newNoteTitle,
          description: this.state.newNoteDescription,
          isPined: this.state.isNewNotePinned,
          color: this.state.newNoteColor,
          isArchived: false,
          labelIdList: map(this.state.labels,'id'),
          reminder: this.state.reminder,
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

  closePoppers = () => {
    this.setState({
      reminderAnchorEl: null,
      reminderOpen: false,
      reminderId: undefined,
      colorId: undefined,
      colorOpen: false,
      colorAnchorEl: null,
    });
  };


  handlePinned = () => {
    this.setState({
      isNewNotePinned: !this.state.isNewNotePinned,
    });
  };

  handleClickReminder = (e) => {
    if (this.state.reminderAnchorEl === null) {
      this.setState({
        reminderAnchorEl: e.currentTarget,
        reminderOpen: !this.state.reminderOpen,
        reminderId: "reminder-popper",
      });
    } else {
      this.setState({
        reminderAnchorEl: null,
        reminderOpen: !this.state.reminderOpen,
        reminderId: undefined,
      });
    }
  };

  handleReminderDateChange = (e) => {
    console.log(e);
    this.setState({
      reminderDate: e,
    });
  };

  handleReminder = () => {
    this.handleClickReminder();
    this.setState({
      reminder: this.state.reminderDate.toLocaleDateString(),
    });
  };

  rendorNote = (note) => {
    return note.noteCheckLists.length === 0 ? (
      <Note note={note} key={note.id} reloadNotes={this.props.reloadNotes} />
    ) : (
      <CheckNote
        note={note}
        key={note.id}
        reloadNotes={this.props.reloadNotes}
      />
    );
  };

  render() {
    let labelChips = "";

    if (this.state.labels.length > 0) {
      labelChips = this.state.labels.map((item) => {
        return (
          <Chip
            key={item.label}
            className="chip"
            label={item.label}
            onDelete={() => this.removeLabel(item.id)}
          />
        );
      });
    }

    let newNoteBig = (
      <Card style={{
        background: this.state.newNoteColor,
      }} className="new-note-big">
        <IconButton
          className="pin-button-new"
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={this.handlePinned}
        >
          {this.state.isNewNotePinned ? (
            <Tooltip title="Pin">
              <RoomIcon className="menu-icon" />
            </Tooltip>
          ) : (
            <Tooltip title="Unpin">
              <RoomOutlinedIcon className="menu-icon" />
            </Tooltip>
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
        {this.state.reminder.length > 0 ? (
          <div
            className={
              isBefore(new Date(this.state.reminder), new Date())
                ? "date-before reminder-chips"
                : "date-after reminder-chips"
            }
          >
            <Chip
              avatar={<ScheduleIcon className="menu-icon" />}
              label={this.state.reminder}
              onDelete={this.handleReminderDelete}
            />
          </div>
        ) : (
          ""
        )}
        <div className="label-chips">{labelChips}</div>
          
        <div className="new-note-buttons">
          <div className="new-note-action-button">
            <div>
              <IconButton
                className="new-note-icon"
                aria-describedby={this.state.reminderId}
                onClick={this.handleClickReminder}
              >
                <Tooltip title="Add Reminder">
                  <AddAlertOutlinedIcon className="menu-icon" />
                </Tooltip>
              </IconButton>
              <Popper
                id={this.state.reminderId}
                open={this.state.reminderOpen}
                anchorEl={this.state.reminderAnchorEl}
              >
                <div className="popover reminder-popover">
                  <div className="reminder-input">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        className="reminder-datepicker"
                        value={this.state.reminderDate}
                        onChange={this.handleReminderDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className="reminder-input reminder-button">
                    <Button onClick={() => this.handleReminder()}>
                      Remind Me
                    </Button>
                  </div>
                </div>
              </Popper>
            </div>
            <div>
              <IconButton className="new-note-icon">
                <Tooltip title="Add Collaborator">
                  <PersonAddOutlinedIcon className="menu-icon" />
                </Tooltip>
              </IconButton>
            </div>
            <div>
              <IconButton
                className="new-note-icon"
                aria-describedby={this.state.colorId}
                onClick={this.handleClickColor}
              >
                <Tooltip title="Change Color">
                  <ColorLensOutlinedIcon className="menu-icon" />
                </Tooltip>
              </IconButton>
              <Popper
                id={this.state.colorId}
                open={this.state.colorOpen}
                anchorEl={this.state.colorAnchorEl}
                placement="bottom-end"
              >
                <ColorPopper
                  close={this.handleClickColor}
                  addColor={this.addColor}
                />
              </Popper>
            </div>
            <div>
              <IconButton className="new-note-icon"   aria-describedby={this.state.labelId}
                      onClick={this.handleClickLabel}
                     >
                <Tooltip title="Add Labels">
                  <LabelOutlinedIcon className="menu-icon" />
                </Tooltip>
              </IconButton>
              <Popper
                      id={this.state.labelId}
                      open={this.state.labelOpen}
                      anchorEl={this.state.labelAnchorEl}
                      placement="right-end"
                    >
                      <LabelPopper
                        labels={this.state.labels}
                        close={this.handleClickLabel}
                        addLabel={this.addLabel}
                        removeLabel={this.removeLabel}
                      />
                    </Popper>
            </div>
            <div>
              <IconButton disabled className="new-note-icon">
                <Tooltip title="Archive">
                  <ArchiveOutlinedIcon className="menu-icon" />
                </Tooltip>
              </IconButton>
            </div>
            <div>
              <IconButton disabled className="new-note-icon">
                <Tooltip title="Delete">
                  <DeleteOutlineOutlinedIcon className="menu-icon" />
                </Tooltip>
              </IconButton>
            </div>
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
      if (this.props.label === "archive") {
        if (note.isArchived && !note.isDeleted) {
          return this.rendorNote(note);
        } else {
          return null;
        }
      }
      if (this.props.label === "trash") {
        if (note.isDeleted) {
          return this.rendorNote(note);
        } else {
          return null;
        }
      }
      if (note.isPined) {
        return null;
      }
      if (
        (note.isArchived && this.props.label !== "archive") ||
        (note.isDeleted && this.props.label !== "trash")
      ) {
        return null;
      } else {
        return this.rendorNote(note);
      }
    });

    let noteListPinned = this.props.notes.map((note) => {
      if (note.isPined && !note.isDeleted && !note.isArchived) {
        return this.rendorNote(note);
      } else {
        return "";
      }
    });

    return (
      <Grid container className="note">
        <Grid item md={this.props.isDrawerOpen ? 8 : 6}>
          {this.props.label !== "archive" && this.props.label !== "trash"
            ? this.state.isNewNote
              ? newNoteBig
              : newNoteSmall
            : ""}
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

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
  Modal,
  TextField,
  Divider,
  Popover,
  Chip,
  Popper,
} from "@material-ui/core";

import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import RoomIcon from "@material-ui/icons/Room";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import UnarchiveOutlinedIcon from "@material-ui/icons/UnarchiveOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import RestoreFromTrashOutlinedIcon from "@material-ui/icons/RestoreFromTrashOutlined";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import PopupState, {
  bindTrigger,
  bindPopover,
  bindToggle,
} from "material-ui-popup-state";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DateFnsUtils from "@date-io/date-fns";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import notesCalls from "./../Service/notes";
import { isBefore, isToday, isTomorrow, isYesterday } from "date-fns";
import LabelPopper from "./LabelPopper";

const NotesCalls = new notesCalls();

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editTitle: this.props.note.title,
      editDescription: this.props.note.description,
      editPinned: this.props.note.isPined,
      editDeleted: this.props.note.isDeleted,
      editArchived: this.props.note.isArchived,
      reminderDate: new Date(),
      reminder: this.updateReminderlabel(),
      reminderId: undefined,
      reminderOpen: false,
      reminderAnchorEl: null,
      reminderIdEdit: undefined,
      reminderOpenEdit: false,
      reminderAnchorElEdit: null,
      labelId: undefined,
      labelOpen: false,
      labelAnchorEl: null,
      labelIdEdit: undefined,
      labelOpenEdit: false,
      labelAnchorElEdit: null,
    };
  }

  addLabel = (id) => {
    console.log(id);
    NotesCalls.addLabelNote(
      this.props.note.id,
      id,
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
  }

  removeLabel = (id) => {
    console.log(id);
    NotesCalls.removeLabelNote(
      this.props.note.id,
      id,
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
  }

  handleClickReminderEdit = (e) => {
    if (this.state.reminderAnchorElEdit === null) {
      this.setState({
        reminderAnchorElEdit: e.currentTarget,
        reminderOpenEdit: !this.state.reminderOpenEdit,
        reminderIdEdit: "reminder-popper-edit",
      });
    } else {
      this.setState({
        reminderAnchorElEdit: null,
        reminderOpenEdit: !this.state.reminderOpenEdit,
        reminderIdEdit: undefined,
      });
    }
  };

  handleClickLabelEdit = (e) => {
    if (this.state.labelAnchorElEdit === null) {
      this.setState({
        labelAnchorElEdit: e.currentTarget,
        labelOpenEdit: !this.state.labelOpenEdit,
        labelIdEdit: "label-popper-edit",
      });
    } else {
      this.setState({
        labelAnchorElEdit: null,
        labelOpenEdit: !this.state.labelOpenEdit,
        labelIdEdit: undefined,
      });
    }
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

  componentDidUpdate() {
    const reminderLabel = this.updateReminderlabel();
    if (reminderLabel !== this.state.reminder) {
      this.setState({
        reminder: reminderLabel,
      });
    }
  }

  updateReminderlabel() {
    if (this.props.note.reminder.length > 0) {
      if (isToday(new Date(this.props.note.reminder[0]))) {
        return (
          "Today, " + new Date(this.props.note.reminder[0]).toLocaleTimeString()
        );
      } else if (isTomorrow(new Date(this.props.note.reminder[0]))) {
        return (
          "Tomorrow, " +
          new Date(this.props.note.reminder[0]).toLocaleTimeString()
        );
      } else if (isYesterday(new Date(this.props.note.reminder[0]))) {
        return (
          "Yesterday, " +
          new Date(this.props.note.reminder[0]).toLocaleTimeString()
        );
      } else {
        return new Date(this.props.note.reminder[0]).toLocaleString();
      }
    }
  }

  componentDidMount() {
    console.log(this.state.reminder);
  }

  handleReminderDelete = () => {
    NotesCalls.removeReminderNotes(
      {
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
  };

  handleReminder = (isEditing) => {
    if (isEditing) {
      this.handleClickReminderEdit();
    } else {
      this.handleClickReminder();
    }
    NotesCalls.addUpdateReminderNotes(
      {
        reminder: this.state.reminderDate,
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
  };

  handleReminderDateChange = (e) => {
    console.log(e);
    this.setState({
      reminderDate: e,
    });
  };

  handlePinned = () => {
    if (this.props.note.isArchived) {
      this.handleArchive();
    }
    NotesCalls.pinUnpinNote(
      {
        isPined: !this.props.note.isPined,
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
  };

  handleArchive = () => {
    NotesCalls.archiveNotes(
      {
        isArchived: !this.props.note.isArchived,
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
  };

  handleDelete = () => {
    NotesCalls.deleteNotes(
      {
        isDeleted: !this.props.note.isDeleted,
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
  };

  handleDeleteForever = () => {
    NotesCalls.deleteNotesForever(
      {
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
  };

  closePoppers = () => {
    this.setState({
      reminderAnchorElEdit: null,
      reminderOpenEdit: false,
      reminderIdEdit: undefined,
      reminderAnchorEl: null,
      reminderOpen: false,
      reminderId: undefined,
      labelAnchorElEdit: null,
      labelOpenEdit: false,
      labelIdEdit: undefined,
    });
    this.handleClickLabelEdit();
  }

  handleClose = () => {
    this.closePoppers();
    NotesCalls.updateNotes(
      {
        noteId: this.props.note.id,
        title: this.state.editTitle,
        description: this.state.editDescription,
      },
      (response) => {
        let message = "";
        if (response.data !== undefined) {
          this.props.reloadNotes();
        } else {
          console.log(response);
        }
      }
    );
    this.setState({
      isEditing: false,
    });
  };

  handleOpen = () => {
    if (!this.props.note.isDeleted) {
      this.setState({
        isEditing: true,
      });
    }
  };

  handleEditPinned = () => {
    NotesCalls.pinUnpinNote(
      {
        isPined: !this.props.note.isPined,
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.setState({
            editPinned: !this.state.editPinned,
          });
        } else {
          console.log(response);
        }
      }
    );
  };

  handleArchiveEdit = () => {
    NotesCalls.archiveNotes(
      {
        isArchived: !this.props.note.isArchived,
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.setState({
            editArchived: !this.state.editArchived,
          });
        } else {
          console.log(response);
        }
      }
    );
  };

  handleDeleteEdit = () => {
    NotesCalls.deleteNotes(
      {
        isDeleted: !this.props.note.isPined,
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          this.setState({
            editDeleted: !this.state.editDeleted,
          });
        } else {
          console.log(response);
        }
      }
    );
  };

  render() {
    return (
      <Grid item md={3}>
        <Modal
          open={this.state.isEditing}
          onClose={this.handleClose}
          className="modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modal-body-note">
            <Card elevation={3} variant="outlined" className="note-card-edit">
              <IconButton
                className="pin-button-edit"
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={this.handleEditPinned}
              >
                {this.state.editPinned ? (
                  <RoomIcon className="menu-icon" />
                ) : (
                  <RoomOutlinedIcon className="menu-icon" />
                )}
              </IconButton>
              <InputBase
                className="note-title"
                onChange={(e) =>
                  this.setState({
                    editTitle: e.target.value,
                  })
                }
                variant="outlined"
                value={this.state.editTitle}
                placeholder="Note Title"
              />
              <Divider />
              <InputBase
                onChange={(e) =>
                  this.setState({
                    editDescription: e.target.value,
                  })
                }
                value={this.state.editDescription}
                className="note-content"
                variant="outlined"
                multiline
                placeholder="Note Title"
              />
              {this.props.note.reminder.length > 0 ? (
                <div
                  className={
                    isBefore(new Date(this.props.note.reminder[0]), new Date())
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
              <Grid container>
                <Grid md={9} item>
                  <CardActions className="note-actions-edit">
                    <Grid container className="note-action-buttons-edit">
                      <Grid item md={2}>
                        <div>
                          <IconButton
                            className="button"
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            aria-describedby={this.state.reminderId}
                            onClick={this.handleClickReminderEdit}
                          >
                            <AddAlertOutlinedIcon className="menu-icon" />
                          </IconButton>
                          <Popper
                            id={this.state.reminderIdEdit}
                            open={this.state.reminderOpenEdit}
                            anchorEl={this.state.reminderAnchorElEdit}
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
                                <Button
                                  onClick={() => this.handleReminder(true)}
                                >
                                  Remind Me
                                </Button>
                              </div>
                            </div>
                          </Popper>
                        </div>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton
                          className="button"
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                        >
                          <PersonAddOutlinedIcon className="menu-icon" />
                        </IconButton>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton
                          className="button"
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                        >
                          <ColorLensOutlinedIcon className="menu-icon" />
                        </IconButton>
                      </Grid>
                      <Grid item md={2}>
                        <div>
                          <IconButton
                            className="button"
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            aria-describedby={this.state.labelIdEdit}
                            onClick={this.handleClickLabelEdit}
                          >
                            <LabelOutlinedIcon className="menu-icon" />
                          </IconButton>
                          <Popper
                            id={this.state.labelIdEdit}
                            open={this.state.labelOpenEdit}
                            anchorEl={this.state.labelAnchorElEdit}
                            placement="right-end"
                          >
                              <LabelPopper labels={this.props.note.noteLabels} close={this.handleClickLabelEdit} addLabel={this.addLabel} removeLabel={this.removeLabel} />
                          </Popper>
                        </div>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton
                          className="button"
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                          onClick={this.handleArchiveEdit}
                        >
                          {this.state.editArchived ? (
                            <UnarchiveOutlinedIcon className="menu-icon" />
                          ) : (
                            <ArchiveOutlinedIcon className="menu-icon" />
                          )}
                        </IconButton>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton
                          className="button"
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                          onClick={this.handleDeleteEdit}
                        >
                          {this.state.editDeleted ? (
                            <RestoreFromTrashOutlinedIcon className="menu-icon" />
                          ) : (
                            <DeleteOutlineOutlinedIcon className="menu-icon" />
                          )}
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Grid>
                <Grid md={3} item className="modal-buttons-edit">
                  <div className="modal-buttons-edit-close">
                    <Button onClick={this.handleClose}>Close</Button>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Modal>
        <Card elevation={3} variant="outlined" className="note-card">
          <IconButton
            className="select-button"
            color="inherit"
            aria-label="open drawer"
            edge="start"
          >
            <CheckCircleIcon className="menu-icon" />
          </IconButton>
          <IconButton
            className="pin-button"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.handlePinned}
          >
            {this.props.note.isPined ? (
              <RoomIcon className="menu-icon" />
            ) : (
              <RoomOutlinedIcon className="menu-icon" />
            )}
          </IconButton>
          <CardHeader
            title={
              <Typography variant="h6">{this.props.note.title}</Typography>
            }
            onClick={this.handleOpen}
            className="card-title"
          />
          <Typography
            variant="body2"
            onClick={this.handleOpen}
            className="note-content"
          >
            {this.props.note.description}
          </Typography>
          {this.props.note.reminder.length > 0 ? (
            <div
              className={
                isBefore(new Date(this.props.note.reminder[0]), new Date())
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
          <CardActions className="note-actions">
            {this.props.note.isDeleted ? (
              <Grid container className="note-action-buttons">
                <Grid item md={2}>
                  <IconButton
                    className="button"
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDeleteForever}
                  >
                    <HighlightOffOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Grid>
                <Grid item md={2}>
                  <IconButton
                    className="button"
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDelete}
                  >
                    {this.props.note.isDeleted ? (
                      <RestoreFromTrashOutlinedIcon className="menu-icon" />
                    ) : (
                      <DeleteOutlineOutlinedIcon className="menu-icon" />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            ) : (
              <Grid container className="note-action-buttons">
                <Grid item md={2}>
                  <div>
                    <IconButton
                      className="button"
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      aria-describedby={this.state.reminderId}
                      onClick={this.handleClickReminder}
                    >
                      <AddAlertOutlinedIcon className="menu-icon" />
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
                          <Button onClick={() => this.handleReminder(false)}>
                            Remind Me
                          </Button>
                        </div>
                      </div>
                    </Popper>
                  </div>
                </Grid>
                <Grid item md={2}>
                  <IconButton
                    className="button"
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                  >
                    <PersonAddOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Grid>
                <Grid item md={2}>
                  <IconButton
                    className="button"
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                  >
                    <ColorLensOutlinedIcon className="menu-icon" />
                  </IconButton>
                </Grid>
                <Grid item md={2}>
                  <div>
                    <IconButton
                      className="button"
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      aria-describedby={this.state.labelIdEdit}
                      onClick={this.handleClickLabelEdit}
                    >
                      <LabelOutlinedIcon className="menu-icon" />
                    </IconButton>
                    
                  </div>
                </Grid>
                <Grid item md={2}>
                  <IconButton
                    className="button"
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleArchive}
                  >
                    {this.props.note.isArchived ? (
                      <UnarchiveOutlinedIcon className="menu-icon" />
                    ) : (
                      <ArchiveOutlinedIcon className="menu-icon" />
                    )}
                  </IconButton>
                </Grid>
                <Grid item md={2}>
                  <IconButton
                    className="button"
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={this.handleDelete}
                  >
                    {this.props.note.isDeleted ? (
                      <RestoreFromTrashOutlinedIcon className="menu-icon" />
                    ) : (
                      <DeleteOutlineOutlinedIcon className="menu-icon" />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            )}
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

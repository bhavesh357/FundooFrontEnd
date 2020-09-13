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
import { SnackbarContext } from "./SnachBarContext";

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import notesCalls from "./../Service/notes";
import { isBefore, isToday, isTomorrow, isYesterday } from "date-fns";
import LabelPopper from "./LabelPopper";
import ColorPopper from "./ColorPopper";

const NotesCalls = new notesCalls();

export default class Note extends React.Component {
  static contextType = SnackbarContext;

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      isInProgress: false,
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
      colorId: undefined,
      colorOpen: false,
      colorAnchorEl: null,
      colorIdEdit: undefined,
      colorOpenEdit: false,
      colorAnchorElEdit: null,
    };
  }

  addLabel = (id) => {
    console.log(id);
    NotesCalls.addLabelNote(this.props.note.id, id, (response) => {
      let message = "";
      if (response.data.data !== undefined) {
        message = "Added Successfully";
        this.props.reloadNotes();
      } else {
        message = response.response.data.error.message;
      }
      this.context.setSnackbarMessage(message);
      this.context.setSnackbarStatus(true);
    });
  };

  addColor = (color) => {
    console.log(color);
    this.setState({
      isInProgress: true,
    });
    NotesCalls.changeColorNotes(
      {
        color: color,
        noteIdList: [this.props.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data !== undefined) {
          message = "Added Color Successfully";
          this.props.reloadNotes();
          this.setState({
            isInProgress: false,
          });
        } else {
          message = response.response.data.error.message;
        }
        this.context.setSnackbarMessage(message);
        this.context.setSnackbarStatus(true);
      }
    );
  };

  removeLabel = (id) => {
    console.log(id);
    NotesCalls.removeLabelNote(this.props.note.id, id, (response) => {
      let message = "";
        if (response.data.data !== undefined) {
          message = "Removed Successfully";
          this.props.reloadNotes();
          this.setState({
            isInProgress: false,
          });
        } else {
          message = response.response.data.error.message;
        }
        this.context.setSnackbarMessage(message);
        this.context.setSnackbarStatus(true);
      }
    );
  };

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

  handleClickColorEdit = (e) => {
    if (this.state.colorAnchorElEdit === null) {
      this.setState({
        colorAnchorElEdit: e.currentTarget,
        colorOpenEdit: !this.state.colorOpenEdit,
        colorIdEdit: "color-popper-edit",
      });
    } else {
      this.setState({
        colorAnchorElEdit: null,
        colorOpenEdit: !this.state.colorOpenEdit,
        colorIdEdit: undefined,
      });
    }
  };

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
      colorId: undefined,
      colorOpen: false,
      colorAnchorEl: null,
      colorIdEdit: undefined,
      colorOpenEdit: false,
      colorAnchorElEdit: null,
    });
  };

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
    let labelChips = "";

    if (this.props.note.noteLabels.length > 0) {
      labelChips = this.props.note.noteLabels.map((item) => {
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

    return (
      <Grid item md={3}>
        <Modal
          open={this.state.isEditing}
          onClose={this.handleClose}
          className="modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            className="modal-body-note"
            style={{
              background: this.props.note.color,
            }}
          >
            <Card
              elevation={3}
              variant="outlined"
              className="note-card-edit"
              style={{
                background: this.props.note.color,
              }}
            >
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
              <div className="label-chips">{labelChips}</div>

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
                        <div>
                          <IconButton
                            className="button"
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            aria-describedby={this.state.colorIdEdit}
                            onClick={this.handleClickColorEdit}
                          >
                            <ColorLensOutlinedIcon className="menu-icon" />
                          </IconButton>
                          <Popper
                            id={this.state.colorIdEdit}
                            open={this.state.colorOpenEdit}
                            anchorEl={this.state.colorAnchorElEdit}
                            placement="right-end"
                          >
                            <ColorPopper
                              close={this.handleClickColorEdit}
                              addColor={this.addColor}
                            />
                          </Popper>
                        </div>
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
                            <LabelPopper
                              labels={this.props.note.noteLabels}
                              close={this.handleClickLabelEdit}
                              addLabel={this.addLabel}
                              removeLabel={this.removeLabel}
                            />
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
        <Card
          elevation={3}
          variant="outlined"
          style={{
            background: this.props.note.color,
          }}
          className="note-card"
        >
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
          <div className="label-chips">{labelChips}</div>
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
                  <div>
                    <IconButton
                      className="button"
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      aria-describedby={this.state.colorId}
                      onClick={this.handleClickColor}
                    >
                      <ColorLensOutlinedIcon className="menu-icon" />
                    </IconButton>
                    <Popper
                      id={this.state.colorId}
                      open={this.state.colorOpen}
                      anchorEl={this.state.colorAnchorEl}
                      placement="right-end"
                    >
                      <ColorPopper
                        close={this.handleClickColor}
                        addColor={this.addColor}
                      />
                    </Popper>
                  </div>
                </Grid>
                <Grid item md={2}>
                  <div>
                    <IconButton
                      className="button"
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      aria-describedby={this.state.labelId}
                      onClick={this.handleClickLabel}
                    >
                      <LabelOutlinedIcon className="menu-icon" />
                    </IconButton>
                    <Popper
                      id={this.state.labelId}
                      open={this.state.labelOpen}
                      anchorEl={this.state.labelAnchorEl}
                      placement="right-end"
                    >
                      <LabelPopper
                        labels={this.props.note.noteLabels}
                        close={this.handleClickLabel}
                        addLabel={this.addLabel}
                        removeLabel={this.removeLabel}
                      />
                    </Popper>
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

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
} from "@material-ui/core";

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

import notesCalls from "./../Service/notes";

const NotesCalls = new notesCalls();

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editTitle: this.props.note.title,
      editDescription: this.props.note.description,
      editPinned: this.props.note.isPined,
    };
  }

  handlePinned = () => {
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

  handleClose = () => {
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
    this.setState({
      isEditing: true,
    });
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
              <Grid container>
                <Grid md={9} item>
                  <CardActions className="note-actions-edit">
                    <Grid container className="note-action-buttons-edit">
                      <Grid item md={2}>
                        <IconButton
                          className="button"
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                        >
                          <AddAlertOutlinedIcon className="menu-icon" />
                        </IconButton>
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
                        <IconButton
                          className="button"
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                        >
                          <CropOriginalIcon className="menu-icon" />
                        </IconButton>
                      </Grid>
                      <Grid item md={2}>
                        <IconButton
                          className="button"
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
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
                        >
                          <MoreVertIcon className="menu-icon" />
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
          <CardActions className="note-actions">
            <Grid container className="note-action-buttons">
              <Grid item md={2}>
                <IconButton
                  className="button"
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                >
                  <AddAlertOutlinedIcon className="menu-icon" />
                </IconButton>
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
                <IconButton
                  className="button"
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                >
                  <CropOriginalIcon className="menu-icon" />
                </IconButton>
              </Grid>
              <Grid item md={2}>
                <IconButton
                  className="button"
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
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
                >
                  <MoreVertIcon className="menu-icon" />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

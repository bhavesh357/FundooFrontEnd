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
import RoomIcon from "@material-ui/icons/Room";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

import notesCalls from './../Service/notes';

const NotesCalls = new notesCalls();

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.note,
      isPinned: this.props.note.isPined,
    };
  }

  handlePinned = () => {
    NotesCalls.pinUnpinNote(
      {
        isPined: !this.state.isPinned,
        noteIdList: [this.state.note.id],
      },
      (response) => {
        let message = "";
        if (response.data.data === undefined) {
          console.log(response);
        } else {
          console.log(response);
        }
      }
    );
  };

  render() {
    return (
      <Grid item md={3}>
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
            {this.state.isPinned ? (
              <RoomIcon className="menu-icon" />
            ) : (
              <RoomOutlinedIcon className="menu-icon" />
            )}
          </IconButton>
          <CardHeader
            title={
              <Typography variant="h6">{this.state.note.title}</Typography>
            }
            className="card-title"
          />
          <Typography variant="body2" className="note-content">
            {this.state.note.description}
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
                  <ArchiveOutlinedIcon className="menu-icon" />
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

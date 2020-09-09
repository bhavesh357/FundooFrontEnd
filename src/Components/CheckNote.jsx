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
import RoomIcon from "@material-ui/icons/Room";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";


import notesCalls from "./../Service/notes";

const NotesCalls = new notesCalls();


export default class CheckNote extends React.Component {
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
            className="card-title"
          />
          <List className="note-content checklist">
            {this.props.note.noteCheckLists.map((value) => {
              const labelId = `checkbox-list-label-${value.id}`;

              return (
                <ListItem
                  key={value.id}
                  role={undefined}
                  className="list-item-checklist"
                  dense
                  button
                >
                  <ListItemIcon className="list-item-icon">
                    <Checkbox
                      className="list-check-icon"
                      edge="start"
                      color="primary"
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value.itemName} />
                </ListItem>
              );
            })}
          </List>
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

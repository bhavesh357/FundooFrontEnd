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
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import RoomIcon from "@material-ui/icons/Room";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

class Notes extends React.Component {
  state = {
    isNewNote: false,
  };

  handleNewNote = () => {
    console.log("test");
    this.setState({
      isNewNote: true,
    });
  };

  render() {
    let newNoteSmall = (
      <Card className="new-note-small">
        {" "}
        <InputBase
          placeholder="Take a Note..."
          className="new-note-input"
          inputProps={{ "aria-label": "search" }}
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
    return (
      <Grid container className="note">
        <Grid item md={6} onClick={this.handleNewNote}>
          <Card className="new-note-big">
            <InputBase
              placeholder="Title"
              className="new-note-title-input"
              inputProps={{ "aria-label": "search" }}
            />
            <InputBase
              placeholder="Take a Note..."
              className="new-note-text-input"
              inputProps={{ "aria-label": "search" }}
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
              <Button>Close</Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item md={this.props.isDrawerOpen ? 12 : 10}>
          <Grid container spacing={2} className="note-row">
            <Grid item md={3}>
              <Card elevation={3} variant="outlined" className="note-card">
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <List className="note-content checklist">
                  {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem
                        key={value}
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
                        <ListItemText
                          id={labelId}
                          primary="testing testing testing testing teasting"
                        />
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
                >
                  <RoomOutlinedIcon className="menu-icon" />
                </IconButton>
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
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
                >
                  <RoomOutlinedIcon className="menu-icon" />
                </IconButton>
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <div className="note-content">
                  <Typography variant="body2">
                    Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                    Mauris rhoncus id eros eu fermentum.
                  </Typography>
                </div>
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
                >
                  <RoomOutlinedIcon className="menu-icon" />
                </IconButton>
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
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
                >
                  <RoomOutlinedIcon className="menu-icon" />
                </IconButton>
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
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
                >
                  <RoomOutlinedIcon className="menu-icon" />
                </IconButton>
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
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
                >
                  <RoomOutlinedIcon className="menu-icon" />
                </IconButton>
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
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
                >
                  <RoomOutlinedIcon className="menu-icon" />
                </IconButton>
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
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
                >
                  <RoomOutlinedIcon className="menu-icon" />
                </IconButton>
                <CardHeader
                  title={
                    <Typography variant="h6">{"Title of the note"}</Typography>
                  }
                  className="card-title"
                />
                <Typography variant="body2" className="note-content">
                  Nunc congue posuere lorem id mattis. Mauris id dolor ex.
                  Mauris rhoncus id eros eu fermentum. Morbi semper, dui sit
                  amet dapibus sollicitudin, massa lectus convallis metus, et
                  mollis felis nunc vitae sem. Ut sit amet scelerisque urna.
                  Nunc euismod quam in ex dignissim, et suscipit mi tempus.
                  Maecenas sed ligula sit amet sem semper fermentum. Etiam
                  dapibus aliquet enim, et sodales purus eleifend sit amet.
                  Etiam pulvinar, felis a vulputate tempus, eros enim ultricies
                  ipsum, id gravida tellus ante accumsan libero. Mauris
                  fermentum lorem turpis, sit amet mattis est ultrices ut. Sed
                  aliquam urna eu felis hendrerit, at blandit libero hendrerit.
                  Cras ornare blandit elementum. Duis in fermentum ligula. Nunc
                  id pharetra neque, quis dignissim nisi. Suspendisse mollis
                  risus nec viverra viverra. Nulla fermentum lobortis ante,
                  vitae lacinia libero pellentesque in. Vestibulum pretium,
                  risus in dignissim condimentum, purus mi volutpat justo, id
                  maximus urna neque vitae lacus. Suspendisse in velit malesuada
                  velit rutrum venenatis sed a nisi. Nulla volutpat tortor sem,
                  quis ultrices ligula ultrices in. Nunc eget ultrices quam.
                  Nullam ut malesuada metus. Sed bibendum, dolor a fringilla
                  vulputate, nunc augue gravida ipsum, eu pulvinar erat enim sed
                  lacus. Maecenas vel dolor consequat, ullamcorper velit sed,
                  suscipit ante. Aliquam erat volutpat
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
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Notes;

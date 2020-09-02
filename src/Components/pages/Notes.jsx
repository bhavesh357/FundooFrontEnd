import React from "react";
import { Grid, Snackbar, AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import keepIcon from './../../Assets/keep.png';

class Notes extends React.Component {
  state = {
    snackbarMessage: "hello",
    snackbarStatus: false,
    email: "",
    password: "",
  };

  handleSnackbarClose = (event, reason) => {
    console.log(event, reason);
    this.setState({
      snackbarStatus: false,
    });
  };

  render() {
    return (
      <Grid container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.state.snackbarStatus}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
          message={this.state.snackbarMessage}
        />
        <Grid item md={12} container >
            <AppBar className="app-bar">
                <Toolbar className="header">
                    <IconButton
                        edge="start"
                         >
                        <MenuIcon className="menu-icon"/>
                    </IconButton>
                    <img src={keepIcon} alt="logo" className="keep-icon" />
                    <Typography variant="h6" className="header-title" >
                        Notes
                    </Typography>
                </Toolbar>
            </AppBar>
        </Grid>
      </Grid>
    );
  }
}

export default Notes;

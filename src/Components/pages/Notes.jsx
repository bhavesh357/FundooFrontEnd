import React from "react";
import {
  Grid,
  Snackbar,
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import keepIcon from "./../../Assets/keep.png";
import userImage from './../../Assets/user.jpg';
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import ClearIcon from "@material-ui/icons/Clear";
import ViewStreamIcon from "@material-ui/icons/ViewStream";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

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
        <Grid item md={12} container>
          <AppBar className="app-bar">
            <Toolbar className="header">
              <IconButton edge="start">
                <MenuIcon className="menu-icon" />
              </IconButton>
              <div className="header-logo">
                <img src={keepIcon} alt="logo" className="keep-icon" />
                <Typography className="header-title">Notes</Typography>
              </div>
              <div className="header-search">
                <div className="search header-icon">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  className="header-input-root header-input-input"
                  inputProps={{ "aria-label": "search" }}
                />
                <div className="header-icon clear">
                  <ClearIcon />
                </div>
              </div>
              <div className="top-menu">
                <div className="header-icon refresh">
                  <RefreshIcon />
                </div>
                <div className="header-icon list">
                  <ViewStreamIcon />
                </div>
                <div className="header-icon setting">
                  <SettingsOutlinedIcon />
                </div>
              </div>
              <div className="user-details">
                      <img src={userImage} className="user-photo" alt="Your-Dp"/>
              </div>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    );
  }
}

export default Notes;

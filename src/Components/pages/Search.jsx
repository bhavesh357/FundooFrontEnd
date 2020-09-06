import React from "react";
import AppBar from "../AppBar";
import MiniDrawer from "../Drawer";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LinkIcon from '@material-ui/icons/Link';
import HeadsetIcon from '@material-ui/icons/Headset';
import ListIcon from '@material-ui/icons/List';
import { Snackbar, Grid, Typography } from "@material-ui/core";

class Search extends React.Component {
  state = {
    snackbarMessage: "hello",
    snackbarStatus: false,
    drawerOpen: false,
    tempDrawerOpen: false,
  };

  handleSnackbarClose = (event, reason) => {
    console.log(event, reason);
    this.setState({
      snackbarStatus: false,
    });
  };

  handleDrawerToggle = () => {
    console.log(this.props.history);
    console.log("Toggled");
    this.setState({
      drawerOpen: !this.state.drawerOpen,
      tempDrawerOpen: false,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      tempDrawerOpen: false,
    });
  };

  handleDrawerOpen = () => {
    this.setState({
      tempDrawerOpen: true,
    });
  };

  render() {
    return (
      <div className="search">
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
        <AppBar
          menuOpen={this.handleDrawerToggle}
          drawerOpen={this.state.drawerOpen}
          searchFocus={true}
          title={"Notes"}
        />
        <MiniDrawer
          menuOpen={this.handleDrawerOpen}
          menuClose={this.handleDrawerClose}
          drawerOpen={this.state.drawerOpen}
          tempDrawerOpen={this.state.tempDrawerOpen}
        />
        <main className="content">
          <Grid item container md={6} className="search-tiles">
          <Grid container className="search-tile-set">
              <Grid item md={12} className="tiles-header">
                Types
              </Grid>
              <Grid item container md={12} className="tiles">
                <Grid item md={3} className="tile">
                    <NotificationsNoneIcon className="tile-icon" />
                    <Typography className="tile-title">Reminders</Typography>
                </Grid>
                <Grid item md={3} className="tile">
                    <ListIcon className="tile-icon" />
                    <Typography className="tile-title">Reminders</Typography>
                </Grid>
                <Grid item md={3} className="tile">
                    <LinkIcon className="tile-icon" />
                    <Typography className="tile-title">Reminders</Typography>
                </Grid>
              </Grid>
            </Grid>
          
            <Grid container className="search-tile-set">
              <Grid item md={12} className="tiles-header">
                Things
              </Grid>
              <Grid item container md={12} className="tiles">
                <Grid item md={3} className="tile gray">
                    <HeadsetIcon className="tile-icon" />
                    <Typography className="tile-title">Music</Typography>
                </Grid>
              </Grid>
            </Grid>
          
            <Grid container className="search-tile-set">
              <Grid item md={12} className="tiles-header">
                Colors
              </Grid>
              <Grid item container md={8} className="tiles">
                <Grid item md={2} className="tile color">
                    <div className="color"></div>
                </Grid>
                <Grid item md={2} className="tile color">
                    <div className="color"></div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default Search;

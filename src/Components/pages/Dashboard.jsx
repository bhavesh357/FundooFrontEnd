import React from "react";
import { Snackbar } from "@material-ui/core";
import AppBar from "../AppBar";
import MiniDrawer from "../Drawer";
import Notes from "../Notes";

class Dashboard extends React.Component {
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
      <div className="dashboard">
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
      searchFocus={false}
      />
      <MiniDrawer 
      menuOpen={this.handleDrawerOpen}
      menuClose={this.handleDrawerClose}
      drawerOpen={this.state.drawerOpen}
      tempDrawerOpen={this.state.tempDrawerOpen}
      />
      <main className="content">
        <Notes isDrawerOpen={this.state.drawerOpen || this.state.tempDrawerOpen }/>
      </main>
      </div>
      );
    }
  }
  
  export default Dashboard;
  
import React from "react";
import AppBar from "../AppBar";
import MiniDrawer from "../Drawer";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import LinkIcon from '@material-ui/icons/Link';
import HeadsetIcon from '@material-ui/icons/Headset';
import ListIcon from '@material-ui/icons/List';
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import { Snackbar, Grid, Typography } from "@material-ui/core";

import dashboardCalls from "./../../Service/dashboard";
const DashboardCalls = new dashboardCalls();

class Search extends React.Component {
  originalItems = [
    {
      name: "Notes",
      icon: <EmojiObjectsOutlinedIcon />,
    },
    {
      name: "Reminders",
      icon: <NotificationsNoneOutlinedIcon />,
    },
    {
      name: "Edit Labels",
      icon: <CreateOutlinedIcon />,
    },
    {
      name: "Archive",
      icon: <ArchiveOutlinedIcon />,
    },
    {
      name: "Trash",
      icon: <DeleteOutlineIcon />,
    },
  ];
  
  items= [...this.originalItems]; 
  
  constructor(props) {
    super(props);
    this.state = {
      snackbarMessage: "hello",
      snackbarStatus: false,
      drawerOpen: false,
      tempDrawerOpen: false,
      labels: this.items,
    };
    this.getData();
  }

  
  getNewlabels = (labels) => {
    let newLabels = labels.map((item) => {
      return {
        name: item.label,
        icon: <LabelOutlinedIcon />,
        id: item.id,
      };
    });
    newLabels.forEach((item) => {
      this.items.splice(2, 0, item);
    });
  };
  
  getData = () => {
    this.items = [...this.originalItems];
    DashboardCalls.getAllLabels(localStorage.getItem("token"), (response) => {
      if (response.data.data.details !== undefined) {
        const newLabels = response.data.data.details;
        this.getNewlabels(newLabels);
        this.setState({
          labels: this.items,
        });
      } else {
        console.log(response);
      }
    });
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
          searchFocus={false}
          title={this.props.match.params.page}
        />
        <MiniDrawer
          menuOpen={this.handleDrawerOpen}
          menuClose={this.handleDrawerClose}
          drawerOpen={this.state.drawerOpen}
          addNewLabel={this.addNewLabel}
          deleteLabel={this.deleteLabel}
          editLabel={this.editLabel}
          labels={this.state.labels}
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

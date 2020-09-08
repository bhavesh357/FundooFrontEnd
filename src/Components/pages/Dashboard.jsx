import React from "react";
import { Snackbar } from "@material-ui/core";
import AppBar from "../AppBar";
import MiniDrawer from "../Drawer";
import Notes from "../Notes";

import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

import dashboardCalls from "./../../Service/dashboard";
const DashboardCalls = new dashboardCalls();


class Dashboard extends React.Component {
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

  addNewLabel = (label) => {
    DashboardCalls.addNewLabel(
      localStorage.getItem("token"),
      {
        label: label,
        isDeleted: false,
        userId: localStorage.getItem("userId"),
      },
      (response) => {
        if (response.data === undefined) {
          console.log(response);
        } else {
          this.getData();
        }
      }
    );
  };

  deleteLabel = (id) => {
    DashboardCalls.deleteLabel(
      localStorage.getItem("token"),
      id,
      (response) => {
        if (response.data === undefined) {
          console.log(response);
        } else {
          this.getData();
        }
      }
    );
  };

  editLabel = (id,label) => {
    DashboardCalls.editLabel(
      localStorage.getItem("token"),
      {
        label: label,
        isDeleted: false,
        id: id,
        userId: localStorage.getItem("userId"),
      },
      (response) => {
        if (response.data === undefined) {
          console.log(response);
        } else {
          console.log(response);
          this.getData();
        }
      }
    );
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
          <Notes
            isDrawerOpen={this.state.drawerOpen || this.state.tempDrawerOpen}
          />
        </main>
      </div>
    );
  }
}

export default Dashboard;

import React from "react";
import { CircularProgress, Snackbar } from "@material-ui/core";
import AppBar from "../AppBar";
import MiniDrawer from "../Drawer";
import Notes from "../Notes";
import { SnackbarContext } from "./../SnachBarContext";

import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

import sideMenuCalls from "../../Service/sideMenu";
import notesCalls from "../../Service/notes";
import { connect } from "react-redux";
import { toggle } from "../../redux/actions";
const SideMenuCalls = new sideMenuCalls();
const NotesCalls = new notesCalls();

const mapStateToProps = (state) => ({
  originalItems: state.originalItems.originalItems,
  drawerOpen: state.drawer.drawerOpen,
  tempDrawerOpen: state.drawer.tempDrawerOpen,
});

class Dashboard extends React.Component {
  items = [...this.props.originalItems];

  static contextType = SnackbarContext;

  constructor(props, context) {
    super(props);
    this.state = {
      labels: this.items,
      notes: [],
      isPinned: false,
      isInProgress: false,
    };
    this.getData();
    this.reloadNotes();

    console.log(context);
  }

  reloadNotes = () => {
    switch (this.props.match.params.page) {
      case "archive":
        this.getArchivedNotes();
        break;
      case "trash":
        this.getTrashedNotes();
        break;
      case "reminders":
        this.getReminderNotes();
        break;
      case "notes":
        this.getNotes();
        break;
      default:
        this.getNotesByLabel(this.props.match.params.page);
    }
  };

  componentDidMount() {
    this.reloadNotes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.reloadNotes();
    }
  }

  handleSnackbarClose = (event, reason) => {
    this.context.setSnackbarStatus(false);
  };

  handleDrawerToggle = () => {
    this.props.dispatch(toggle());
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
    SideMenuCalls.addNewLabel(
      localStorage.getItem("token"),
      {
        label: label,
        isDeleted: false,
        userId: localStorage.getItem("userId"),
      },
      (response) => {
        let message = "";
        if (response.data === undefined) {
          message = response.response.data.error.message;
        } else {
          message = "Added Successfully";
          this.getData();
        }
        this.context.setSnackbarMessage(message);
        this.context.setSnackbarStatus(true);
      }
    );
  };

  deleteLabel = (id) => {
    SideMenuCalls.deleteLabel(localStorage.getItem("token"), id, (response) => {
      let message = "";
      if (response.data === undefined) {
        message = response.response.data.error.message;
      } else {
        message = "Deleted Successfully";
        this.getData();
      }
      this.context.setSnackbarMessage(message);
      this.context.setSnackbarStatus(true);
    });
  };

  editLabel = (id, label) => {
    SideMenuCalls.editLabel(
      localStorage.getItem("token"),
      {
        label: label,
        isDeleted: false,
        id: id,
        userId: localStorage.getItem("userId"),
      },
      (response) => {
        let message = "";
        if (response.data === undefined) {
          message = response.response.data.error.message;
        } else {
          message = "Updated Successfully";
          this.getData();
        }
        this.context.setSnackbarMessage(message);
        this.context.setSnackbarStatus(true);
      }
    );
  };

  getData = () => {
    this.setState({
      isInProgress: true,
    });
    this.items = [...this.props.originalItems];
    SideMenuCalls.getAllLabels(localStorage.getItem("token"), (response) => {
      if (response.data.data.details !== undefined) {
        const newLabels = response.data.data.details;
        this.getNewlabels(newLabels);
        this.setState({
          labels: this.items,
          isInProgress: false,
        });
      } else {
        console.log(response);
      }
    });
  };

  getNotes = () => {
    this.setState({
      isInProgress: true,
    });
    NotesCalls.getAllNotes((response) => {
      if (response.data.data.data === undefined) {
        console.log(response.data.data.data);
      } else {
        this.setState({
          notes: [...response.data.data.data],
          isPinned: this.checkIsPinned([...response.data.data.data]),
          isInProgress: false,
        });
      }
    });
  };

  getArchivedNotes = () => {
    this.setState({
      isInProgress: true,
    });
    NotesCalls.getArchivedNotes((response) => {
      if (response.data.data.data === undefined) {
        console.log(response.data.data.data);
      } else {
        this.setState({
          notes: [...response.data.data.data],
          isPinned: false,
          isInProgress: false,
        });
      }
    });
  };

  getTrashedNotes = () => {
    this.setState({
      isInProgress: true,
    });
    NotesCalls.getTrashedNotes((response) => {
      if (response.data.data.data === undefined) {
        console.log(response.data.data.data);
      } else {
        this.setState({
          notes: [...response.data.data.data],
          isPinned: false,
          isInProgress: false,
        });
      }
    });
  };

  getReminderNotes = () => {
    this.setState({
      isInProgress: true,
    });
    NotesCalls.getReminderNotes((response) => {
      if (response.data.data.data === undefined) {
        console.log(response.data.data.data);
      } else {
        console.log(response.data.data.data);
        this.setState({
          notes: [...response.data.data.data],
          isPinned: this.checkIsPinned([...response.data.data.data]),
          isInProgress: false,
        });
      }
    });
  };

  getNotesByLabel = (label) => {
    this.setState({
      isInProgress: true,
    });
    NotesCalls.getNotesByLabel(label, (response) => {
      if (response.data.data.data === undefined) {
        console.log(response.data.data.data);
      } else {
        console.log(response.data.data.data);
        this.setState({
          notes: [...response.data.data.data],
          isPinned: this.checkIsPinned([...response.data.data.data]),
          isInProgress: false,
        });
      }
    });
  };

  checkIsPinned = (arr) => {
    try {
      for (let i = 0; i < arr.length; i++) {
        let temp = arr[i];
        if (temp.isPined && !temp.isDeleted && !temp.isArchived) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  render() {
    return (
      <div className="dashboard">
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={this.context.snackbarStatus}
          onClose={this.handleSnackbarClose}
          autoHideDuration={2000}
          message={this.context.snackbarMessage}
        />
        <AppBar
          menuOpen={this.handleDrawerToggle}
          drawerOpen={this.props.drawerOpen}
          searchFocus={false}
          title={this.props.match.params.page}
        />
        <MiniDrawer
          addNewLabel={this.addNewLabel}
          deleteLabel={this.deleteLabel}
          editLabel={this.editLabel}
          labels={this.state.labels}
          title={this.props.match.params.page}
        />
        <main className="content">
          {this.state.isInProgress ? (
            <CircularProgress />
          ) : ("")}
            <Notes
              isDrawerOpen={this.props.drawerOpen || this.props.tempDrawerOpen}
              notes={this.state.notes}
              label={this.props.match.params.page}
              reloadNotes={this.reloadNotes}
              isPinned={this.state.isPinned}
            />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);

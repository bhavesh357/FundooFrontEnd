import React from "react";
import { Snackbar } from "@material-ui/core";
import AppBar from "../AppBar";
import MiniDrawer from "../Drawer";
import Notes from "../Notes";

import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

import sideMenuCalls from "../../Service/sideMenu";
import notesCalls from "../../Service/notes";
import { connect } from "react-redux";
import { toggle } from "../../redux/actions";
const SideMenuCalls = new sideMenuCalls();
const NotesCalls = new notesCalls();


const mapStateToProps = state => ({
  originalItems: state.originalItems.originalItems,
  drawerOpen:state.drawer.drawerOpen,
  tempDrawerOpen: state.drawer.tempDrawerOpen,
});


class Dashboard extends React.Component {
  items = [...this.props.originalItems];

  constructor(props) {
    super(props);
    this.state = {
      snackbarMessage: "hello",
      snackbarStatus: false,
      labels: this.items,
      notes: [],
      isPinned: false,
    };
    this.getData();
    this.getNotes();
  }

  handleSnackbarClose = (event, reason) => {
    console.log(event, reason);
    this.setState({
      snackbarStatus: false,
    });
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
        this.setState({
          snackbarMessage: message,
          snackbarStatus: true,
        });
      }
    );
  };

  deleteLabel = (id) => {
    SideMenuCalls.deleteLabel(
      localStorage.getItem("token"),
      id,
      (response) => {
        let message = "";
        if (response.data === undefined) {
          message = response.response.data.error.message;
        } else {
          message = "Deleted Successfully";
          this.getData();
        }
        this.setState({
          snackbarMessage: message,
          snackbarStatus: true,
        });
      }
    );
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
        this.setState({
          snackbarMessage: message,
          snackbarStatus: true,
        });
      }
    );
  };

  getData = () => {
    this.items = [...this.props.originalItems];
    SideMenuCalls.getAllLabels(localStorage.getItem("token"), (response) => {
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

  getNotes = () => {
    NotesCalls.getAllNotes((response) => {
      if (response.data.data.data === undefined) {
        console.log(response.data.data.data);
      } else {
        this.setState({
          notes: [...response.data.data.data],
          isPinned : this.checkIsPinned([...response.data.data.data]),
        });

      }
    });
  };

  checkIsPinned = (arr) => {
    try{
      for(let i=0;i<arr.length; i++){
      let temp = arr[i];
      if(temp.isPined){
        return true;
      }
    }
    return false;
    } catch (e){
      return false;
    }
    
  }

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
          drawerOpen={this.props.drawerOpen}
          searchFocus={false}
          title={this.props.match.params.page}
        />
        <MiniDrawer
          addNewLabel={this.addNewLabel}
          deleteLabel={this.deleteLabel}
          editLabel={this.editLabel}
          labels={this.state.labels}
        />
        <main className="content">
          <Notes
            isDrawerOpen={this.props.drawerOpen || this.props.tempDrawerOpen}
            notes = {this.state.notes}
            reloadNotes={this.getNotes}
            isPinned={this.state.isPinned}
          />
        </main>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(Dashboard);

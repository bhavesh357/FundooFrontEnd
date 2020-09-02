import React from "react";
import { Grid, Snackbar } from "@material-ui/core";

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
        
      </Grid>
    );
  }
}

export default Notes;

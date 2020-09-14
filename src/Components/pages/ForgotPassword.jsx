import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  CardActions,
  Button,
  Snackbar,
} from "@material-ui/core";
import FundooLogo from "./../FundooLogo";
import PageTitle from "./../PageTitle";
import { Link } from "react-router-dom";
import validation from "../../Service/validation";
import calls from "../../Service/calls";
let Validate = new validation();
let Calls = new calls();

class ForgotPassword extends React.Component {
  state = {
    isEmailInvalid: false,
    snackbarMessage: "hello",
    snackbarStatus: false,
    email: "",
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleNext = () => {
    let patterns = Validate.getRegexs();
    let emailStatus = Validate.validateInput(this.state.email, patterns.email);
    this.setState({
      isEmailInvalid: emailStatus,
    });
    if (!emailStatus) {
      let user = {
        email: this.state.email,
      };
      Calls.resetWithdata(user, (response) => {
        let message;
        if (response.data === undefined) {
          message = response.response.data.error.message;
        } else {
          message = response.data.message;
        }
        this.setState({
          snackbarMessage: message,
          snackbarStatus: true,
        });
      });
    }
  };

  handleSnackbarClose = (event, reason) => {
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
          autoHideDuration={5000}
          message={this.state.snackbarMessage}
        />
        <Grid item md={4} />
        <Grid item container md={4}>
          <Card className="card">
            <CardContent className="card-content">
              <Grid item md={1}></Grid>
              <Grid item md={10} xs={10}>
                <FundooLogo />
                <PageTitle title="Find Your Password" />
                <Typography className="page-subtitle">
                  Enter your recovery Email
                </Typography>
                <TextField
                  onChange={this.handleEmail}
                  value={this.state.email}
                  id="email"
                  className="sign-input"
                  label="Email Id"
                  size="small"
                  variant="outlined"
                  error={this.state.isEmailInvalid}
                  helperText={
                    this.state.isEmailInvalid ? "Enter Proper Email Id" : ""
                  }
                />
                <CardActions className="sign-buttons">
                  <Link to={"/"} className="sign-link">
                    Back
                  </Link>
                  <Button
                    onClick={this.handleNext}
                    variant="contained"
                    color="primary"
                    className="sign-links-button"
                  >
                    Next
                  </Button>
                </CardActions>
              </Grid>
              <Grid item md={1}></Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} />
      </Grid>
    );
  }
}

export default ForgotPassword;

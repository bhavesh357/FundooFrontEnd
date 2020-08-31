import React from "react";
import FundooLogo from "./../FundooLogo";
import PageTitle from "./../PageTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Snackbar,
} from "@material-ui/core";
import validation from "../../Service/validation";
import calls from "../../Service/calls";
let Validate = new validation();
let Calls = new calls();

class SignUp extends React.Component {
  state = {
    showPassword: false,
    showFirstPassword: false,
    isEmailInvalid: false,
    isFirstNameInvalid: false,
    isLastNameInvalid: false,
    isFirstPasswordInvalid: false,
    isSecondPasswordinvalid: false,
    doPasswordsMatch: true,
    firstName: "",
    lastName: "",
    email: "",
    firstPassword: "",
    secondPassword: "",
  };

  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  handleClickShowFirstPassword = () => {
    this.setState((state) => ({ showFirstPassword: !state.showFirstPassword }));
  };

  handleSignUp = () => {
    let patterns = Validate.getRegexs();
    let firstPasswordStatus = Validate.validateInput(this.state.firstPassword, patterns.password);
    let secondPasswordStatus = Validate.validateInput(
      this.state.secondPassword,
      patterns.password
    );
    let emailStatus = Validate.validateInput(this.state.email, patterns.email);
    let firstNameStatus = Validate.validateInput(this.state.firstName, patterns.name);
    let lastNameStatus = Validate.validateInput(this.state.lastName, patterns.name);
    let passwordsMatchingStatus = Validate.checkIfSame(
      this.state.firstPassword,
      this.state.secondPassword,
      firstPasswordStatus,
      secondPasswordStatus
    );

    this.setState({
      isEmailInvalid: emailStatus,
      isFirstNameInvalid: firstNameStatus,
      isLastNameInvalid: lastNameStatus,
      isFirstPasswordInvalid: firstPasswordStatus,
      isSecondPasswordinvalid: secondPasswordStatus,
      doPasswordsMatch: passwordsMatchingStatus,
    });
    if (
      !emailStatus &&
      !firstNameStatus &&
      !lastNameStatus &&
      passwordsMatchingStatus
    ) {
      let user = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.firstPassword,
        service: "advance",
      }
      Calls.signUpWithdata(user , (message) => {
        this.setState({
          snackbarMessage: message,
          snackbarStatus: true,
        });
      });
    }
  };

  handleSnackbarClose = (event, reason) => {
    console.log(event, reason);
    this.setState({
      snackbarStatus: false,
    });
  };

  

  handleFirstName = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  handleLastName = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleFirstPassword = (e) => {
    this.setState({
      firstPassword: e.target.value,
    });
  };

  handleSecondPassword = (e) => {
    this.setState({
      secondPassword: e.target.value,
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
        <Grid item md={3} />
        <Grid item container md={6}>
          <Card className="card">
            <CardContent className="card-content">
              <Grid item md={1}></Grid>
              <Grid item md={10} xs={10}>
                <FundooLogo />
                <PageTitle title="Sign Up" />
                <Typography className="page-subtitle">
                  Create your Fundoo Account
                </Typography>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="first-name"
                      className="sign-input"
                      label="First Name"
                      onChange={this.handleFirstName}
                      value={this.state.firstName}
                      size="small"
                      variant="outlined"
                      error={this.state.isFirstNameInvalid}
                      helperText="Enter name with First Letter Capital"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="last-name"
                      className="sign-input"
                      label="Last Name"
                      onChange={this.handleLastName}
                      value={this.state.lastName}
                      size="small"
                      variant="outlined"
                      error={this.state.isLastNameInvalid}
                      helperText="Enter name with First Letter Capital"
                    />
                  </Grid>
                </Grid>
                <TextField
                  id="email"
                  className="sign-input"
                  label="Email Id"
                  onChange={this.handleEmail}
                  value={this.state.email}
                  size="small"
                  variant="outlined"
                  error={this.state.isEmailInvalid}
                  helperText="Enter proper Email Id"
                />
                <TextField
                  id="password-first"
                  type={this.state.showFirstPassword ? "text" : "password"}
                  className="sign-input"
                  label="Enter Password"
                  onChange={this.handleFirstPassword}
                  value={this.state.firstPassword}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowFirstPassword}
                        >
                          {this.state.showFirstPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={this.state.isFirstPasswordInvalid}
                  helperText="Use at least 8 characters. One Uppercase One Lowercase One special character and One number atleast."
                />
                <TextField
                  variant="outlined"
                  id="password-second"
                  size="small"
                  type={this.state.showPassword ? "text" : "password"}
                  label="Re-enter Password"
                  onChange={this.handleSecondPassword}
                  value={this.state.secondPassword}
                  className="sign-input"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={this.state.isSecondPasswordinvalid || !this.state.doPasswordsMatch}
                  helperText={
                    this.state.doPasswordsMatch ? "" : "Passwords should match"
                  }
                />
                <CardActions className="sign-buttons">
                  <div className="sign-links">
                    <Link to={"/"} className="sign-link">
                      Sign In Instead
                    </Link>
                  </div>
                  <Button
                    onClick={this.handleSignUp}
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </CardActions>
              </Grid>
              <Grid item md={1}></Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={3} />
      </Grid>
    );
  }
}

export default SignUp;

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
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link } from "react-router-dom";
import validation from "../../Service/validation";
import calls from "../../Service/calls";
let Validate = new validation();
let Calls = new calls();

class ResetPassword extends React.Component {
  state = {
    firstPasswordVisible: false,
    secondPasswordVisible: false,
    isFirstPasswordInvalid: false,
    isSecondPasswordinvalid: false,
    doPasswordsMatch: true,
    firstPassword: "",
    secondPassword: "",
  };

  handleClickShowFirstPassword = () => {
    this.setState((state) => ({
      firstPasswordVisible: !state.firstPasswordVisible,
    }));
  };

  handleClickShowSecondPassword = () => {
    this.setState((state) => ({
      secondPasswordVisible: !state.secondPasswordVisible,
    }));
  };

  handleNext = () => {
    let patterns = Validate.getRegexs();
    let firstPasswordStatus = Validate.validateInput(
      this.state.firstPassword,
      patterns.password
    );
    let secondPasswordStatus = Validate.validateInput(
      this.state.secondPassword,
      patterns.password
    );
    let passwordMatchStatus = Validate.checkIfSame(
      this.state.firstPassword,
      this.state.secondPassword,
      firstPasswordStatus,
      secondPasswordStatus
    );
    this.setState({
      isFirstPasswordInvalid: firstPasswordStatus,
      isSecondPasswordinvalid: secondPasswordStatus,
      doPasswordsMatch: passwordMatchStatus,
    });
    if (passwordMatchStatus) {
      let user = {
        newPassword: this.state.firstPassword,
      };
      Calls.resetWithData(user, this.props.match.params.token, (response) => {
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
        <Grid item md={4} />
        <Grid item container md={4}>
          <Card className="card">
            <CardContent className="card-content">
              <Grid item md={1}></Grid>
              <Grid item md={10}>
                <FundooLogo />
                <PageTitle title="Reset Your Password" />
                <Typography className="page-subtitle">
                  Enter your new Password
                </Typography>
                <TextField
                  type={this.state.firstPasswordVisible ? "text" : "password"}
                  id="password-first"
                  onChange={this.handleFirstPassword}
                  value={this.state.firstPassword}
                  className="sign-input"
                  label="Enter Password"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowFirstPassword}
                        >
                          {this.state.firstPassword ? (
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
                ></TextField>
                <TextField
                  id="password-second"
                  onChange={this.handleSecondPassword}
                  value={this.state.secondPassword}
                  type={this.state.secondPasswordVisible ? "text" : "password"}
                  className="sign-input"
                  label="Re-enter Password"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowSecondPassword}
                        >
                          {this.state.isSecondPasswordinvalid ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={
                    this.state.isSecondPasswordinvalid ||
                    !this.state.doPasswordsMatch
                  }
                  helperText={
                    this.state.doPasswordsMatch ? "" : "Passwords should match"
                  }
                ></TextField>
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

export default ResetPassword;

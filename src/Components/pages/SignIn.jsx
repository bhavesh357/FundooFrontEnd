import React from "react";
import FundooLogo from "./../FundooLogo";
import PageTitle from "./../PageTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Snackbar,
} from "@material-ui/core";
import Axios from "axios";
import validation from "./../../service/validation";
let Validate = new validation();

class SignIn extends React.Component {
  state = {
    emailInvalid: false,
    passwordInvalid: false,
    snackbarMessage: "hello",
    snackbarStatus: false,
    email: "",
    password: "",
  };

  handleSignIn = () => {
    let patterns = Validate.getRegexs();
    let emailStatus = Validate.validateInput(this.state.email, patterns.email);
    let passwordStatus = Validate.validateInput(
      this.state.password,
      patterns.password
    );
    this.setState({
      emailInvalid: emailStatus,
      passwordInvalid: passwordStatus,
    });
    if (!emailStatus && !passwordStatus) {
      let user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.singInWithData(user);
    }
  };

  singInWithData(user) {
    Axios.post(
      "http://fundoonotes.incubation.bridgelabz.com/api/user/login",
      user
    )
      .then((response) => {
        console.log(response);
        this.setState({
          snackbarMessage: "Login Successful",
          snackbarStatus: true,
        });
      })
      .catch((error) => {
        // handle error
        console.log(error.response.data.error.message);
        this.setState({
          snackbarMessage: error.response.data.error.message,
          snackbarStatus: true,
        });
      });
  }

  handleSnackbarClose = (event, reason) => {
    console.log(event, reason);
    this.setState({
      snackbarStatus: false,
    });
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
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
              <Grid item md={10} xs={10}>
                <FundooLogo />
                <PageTitle title="Sign in" />
                <Typography className="page-subtitle">
                  Continue to Fundoo
                </Typography>
                <TextField
                  id="sign-in-email"
                  onChange={this.handleEmail}
                  value={this.state.email}
                  className="sign-input"
                  label="Email"
                  variant="outlined"
                  error={this.state.emailInvalid}
                  helperText={
                    this.state.emailInvalid ? "Enter Proper Email Id" : ""
                  }
                />
                <TextField
                  id="sign-in-password"
                  onChange={this.handlePassword}
                  value={this.state.password}
                  className="sign-input"
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={this.state.passwordInvalid}
                />
                <CardActions className="sign-buttons">
                  <div className="sign-links">
                    <Link to={"/forgotpassword"} className="sign-link">
                      Forgot Password?
                    </Link>
                    <Link to={"/signup"} className="sign-link">
                      Sign Up Instead
                    </Link>
                  </div>
                  <Button
                    onClick={this.handleSignIn}
                    variant="contained"
                    color="primary"
                  >
                    Sign in
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

export default SignIn;

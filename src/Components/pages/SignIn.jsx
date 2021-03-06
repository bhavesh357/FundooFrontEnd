import React from "react";
import FundooLogo from "./../FundooLogo";
import PageTitle from "./../PageTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Snackbar,
} from "@material-ui/core";
import validation from "../../Service/validation";
import calls from "../../Service/calls";
let Validate = new validation();
let Calls = new calls();

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
      Calls.signInWithData(user, (response) => {
        let message;
        if (response.data === undefined) {
          message = response.response.data.error.message;
          this.setState({
            snackbarMessage: message,
            snackbarStatus: true,
          });
        } else {
          localStorage.setItem('token',response.data.id);
          localStorage.setItem('userId',response.data.userId);
          this.redirectToDashboard();
        }
      });
    }
  };

  redirectToDashboard= () =>{
    this.props.history.push("/dashboard/notes")
  }

  handleSnackbarClose = (event, reason) => {
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
                    className="sign-links-button"
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

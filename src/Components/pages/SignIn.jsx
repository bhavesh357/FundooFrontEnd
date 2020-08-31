import React from 'react';
import FundooLogo from './../FundooLogo';
import PageTitle from './../PageTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Card,CardContent, Typography, CardActions, Snackbar } from '@material-ui/core';
import Axios from 'axios';

class SignIn extends React.Component{
    
    state={
        emailInvalid: false,
        passwordInvalid: false,
        snackbarMessage:"hello",
        snackbarStatus:false,
        email: "",
        password: "",
    };
    
    handleSignIn = () => {
        const emailRegex = /^[\w\d]{1,}[.\\\-#!]?[\w\d]{1,}@[\w\d]{1,}.[a-z]{2,3}.?([a-z]{2})?$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@#!$%^&*()_]{8,})[A-Za-z0-9]+?[@#!$%^&*()_][A-Za-z0-9]{1,}?$/;
        let email= this.state.email;
        let password= this.state.password;
        let emailStatus = this.validateInput(email,emailRegex);
        let passwordStatus = this.validateInput(password,passwordRegex);
        this.setState({
            emailInvalid: emailStatus,
            passwordInvalid: passwordStatus,
        });
        if(!emailStatus && !passwordStatus){
            this.singInWithData(email,password);
        }
    }
    
    singInWithData(email,password){
        Axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/login', {
        "email": email,
        "password": password,
    })
    .then((response) => {
        console.log(response);
        this.setState({
            snackbarMessage: "Login Successful",
            snackbarStatus: true,
        });
    })
    .catch( (error) => {
        // handle error
        console.log(error.response.data.error.message);
        this.setState({
            snackbarMessage: error.response.data.error.message,
            snackbarStatus: true,
        });
    });
} 

validateInput = (input,pattern) =>{
    if(pattern.test(input)){
        console.log(input);
        return false;
    }
    return true;
}


handleSnackbarClose = (event,reason) =>{
    console.log(event,reason);
    this.setState({
        snackbarStatus: false,
    })
}

handleEmail = (e) => {
    this.setState({
        email: e.target.value
    });
}

handlePassword = (e) => {
    this.setState({
        password: e.target.value
    });
}

render(){
    return(
        
        <Grid container>
        <Snackbar 
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        open= {this.state.snackbarStatus}
        onClose={this.handleSnackbarClose}
        autoHideDuration={2000}
        message={this.state.snackbarMessage}
        
        />
        <Grid item md={4} />
        <Grid item container md={4}>
        <Card className="card">
        <CardContent className="card-content">
        <Grid item md={1}></Grid>
        <Grid item md={10}  xs={10}>
        <FundooLogo />
        <PageTitle title="Sign in" />
        <Typography className="page-subtitle">Continue to Fundoo</Typography>
        <TextField id="sign-in-email" onChange={this.handleEmail} value={this.state.email} className="sign-input" label="Email" variant="outlined" error={this.state.emailInvalid} helperText={this.state.emailInvalid ? "Enter Proper Email Id": ""} />
        <TextField id="sign-in-password" onChange={this.handlePassword} value={this.state.password} className="sign-input" type="password" label="Password" variant="outlined" error={this.state.passwordInvalid} />
        <CardActions className="sign-buttons" >
        <div className="sign-links">
        <Link to={"/forgotpassword"} className="sign-link" >
        Forgot Password?
        </Link>
        <Link to={"/signup"} className="sign-link" >
        Sign Up Instead 
        </Link>
        </div>
        <Button onClick={this.handleSignIn} variant="contained" color="primary">
        Sign in
        </Button>
        </CardActions>
        </Grid>
        <Grid item md={1} ></Grid>
        </CardContent>
        </Card>
        </Grid>
        <Grid item md={4} />
        </Grid>
        );
    }
}

export default SignIn;
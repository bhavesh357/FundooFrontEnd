import React from 'react';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';

class SignIn extends React.Component{

    state={
        emailInvalid: false,
        passwordInvalid: false,
    };

    handleSignIn = () => {
        const emailRegex = /^[\w\d]{1,}[.\\\-#!]?[\w\d]{1,}@[\w\d]{1,}.[a-z]{2,3}.?([a-z]{2})?$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@#!$%^&*()_]{8,})[A-Za-z0-9]+?[@#!$%^&*()_][A-Za-z0-9]{1,}?$/;
        let email= document.getElementById("sign-in-email").value;
        let password= document.getElementById("sign-in-password").value;
        if(emailRegex.test(email)){
            this.setState({
                emailInvalid: false,
            });
            console.log(email);
        }else{
            this.setState({
                emailInvalid: true,
            });
        }
        if(passwordRegex.test(password)){
            this.setState({
                passwordInvalid: false,
            });
            console.log(password);
        }else{
            this.setState({
                passwordInvalid: true,
            });
        }
    }

    render(){
        return(
            <Card id="sign-in">
            <Grid container>
            <Grid item md={12}>
                <FundooLogo />
            </Grid>
            <Grid item md={12}>
                <PageTitle title="Sign in" />
            </Grid>
            <Grid item md={12}>
                <div className="page-subtitle">Continue to Fundoo</div>
            </Grid>
            <Grid item md={12} container>
                <Grid item md={1} ></Grid>
                <Grid item md={10} >
                    <TextField id="sign-in-email" className="sign-input" label="Email" variant="outlined" error={this.state.emailInvalid} helperText="Enter Proper Email Id" />
                </Grid>
                <Grid item md={1} ></Grid>
            </Grid>
            <Grid item md={12} container>
                <Grid item md={1} ></Grid>
                <Grid item md={10} >
                    <TextField id="sign-in-password" className="sign-input" label="Password" variant="outlined" error={this.state.passwordInvalid} helperText="Use at least 8 characters. One Uppercase One Lowercase One special character and One number atleast." />
                </Grid>
                <Grid item md={1} ></Grid>
            </Grid>
            <Grid item md={12} container>
                <Grid item md={1} ></Grid>
                <Grid item md={10} >
                <div className="sign-buttons" >
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
            </div>
            </Grid>
                <Grid item md={1} ></Grid>
            </Grid>
            </Grid>
            
            </Card>
            );
        }
    }
    
    export default SignIn;
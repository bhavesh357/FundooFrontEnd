import React from 'react';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Card,CardContent, Typography, CardActions } from '@material-ui/core';

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
            <Grid container>
            <Grid item md={4} />
            <Grid item container md={4}>
            <Card className="card">
            <CardContent className="card-content">
            <Grid item md={1}></Grid>
            <Grid item md={10}  xs={10}>
            <FundooLogo />
            <PageTitle title="Sign in" />
            <Typography className="page-subtitle">Continue to Fundoo</Typography>
            <TextField id="sign-in-email" className="sign-input" label="Email" variant="outlined" error={this.state.emailInvalid} helperText="Enter Proper Email Id" />
            <TextField id="sign-in-password" className="sign-input" type="password" label="Password" variant="outlined" error={this.state.passwordInvalid} helperText="Use at least 8 characters. One Uppercase One Lowercase One special character and One number atleast." />
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
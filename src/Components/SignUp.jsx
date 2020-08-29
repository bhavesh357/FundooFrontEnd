import React from 'react';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Card, CardContent, CardActions, Typography, Snackbar } from '@material-ui/core';
import Axios from 'axios';

class SignUp extends React.Component{
    state = {
        showPassword: false,
        showFirstPassword: false,
        isEmailInvalid: false,
        isFirstNameInvalid: false,
        isLastNameInvalid: false,
        isFirstPasswordInvalid: false,
        isSecondPasswordinvalid: false,
        doPasswordsMatch: false,
    };
    
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    
    handleClickShowFirstPassword = () => {
        this.setState(state => ({ showFirstPassword: !state.showFirstPassword }));
    };
    
    handleSignUp = () => {
        const emailRegex = /^[\w\d]{1,}[.\\\-#!]?[\w\d]{1,}@[\w\d]{1,}.[a-z]{2,3}.?([a-z]{2})?$/;
        const nameRegex = /^[A-Z]{1}[a-z]{2,15}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@#!$%^&*()_]{8,})[A-Za-z0-9]+?[@#!$%^&*()_][A-Za-z0-9]{1,}?$/;
        let email= document.getElementById("email").value;
        let firstPassword= document.getElementById("password-first").value;
        let secondPassword= document.getElementById("password-second").value;
        let firstName= document.getElementById("first-name").value;
        let lastName= document.getElementById("last-name").value;
        let firstPasswordStatus= this.validateInput(firstPassword,passwordRegex);
        let secondPasswordStatus= this.validateInput(secondPassword,passwordRegex);
        let emailStatus = this.validateInput(email,emailRegex);
        let firstNameStatus = this.validateInput(firstName,nameRegex);
        let lastNameStatus = this.validateInput(lastName,nameRegex);
        let passwordsMatchingStatus = this.checkIfSame(firstPassword,secondPassword,firstPasswordStatus,secondPasswordStatus);
        
        this.setState({
            isEmailInvalid: emailStatus,
            isFirstNameInvalid: firstNameStatus,
            isLastNameInvalid: lastNameStatus,
            isFirstPasswordInvalid: firstPasswordStatus,
            isSecondPasswordinvalid: secondPasswordStatus,
            doPasswordsMatch: passwordsMatchingStatus,
        });
        if(!emailStatus && !firstNameStatus && !lastNameStatus && passwordsMatchingStatus ){
            this.signUpWithdata(email,firstName,lastName,firstPassword);
        }
    }
    
    
    handleSnackbarClose = (event,reason) =>{
        console.log(event,reason);
        this.setState({
            snackbarStatus: false,
        })
    }
    
    signUpWithdata(email,firstName,lastName,password){
        Axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp', {
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "service": "advance",
    })
    .then((response) => {
        console.log(response.data.data);
        this.setState({
            snackbarMessage: response.data.data.message,
            snackbarStatus: true,
        });
    })
    .catch( (error) => {
        // handle error
        console.log(error.response);
        this.setState({
            snackbarMessage: error.response.data.error.message,
            snackbarStatus: true,
        });
    });
}

checkIfSame = (firstInput,secondInput,statusOfFirst,statusOfSecond) => {
    if(firstInput===secondInput && !statusOfFirst && !statusOfSecond){
        return true;
    }
    return false;
}

validateInput = (input,pattern) =>{
    if(pattern.test(input)){
        console.log(input);
        return false;
    }
    return true;
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
        <Grid item md={3} />
        <Grid item container md={6}>
        <Card className="card">
        <CardContent className="card-content">
        <Grid item md={1}></Grid>
        <Grid item md={10}  xs={10}>
        <FundooLogo />
        <PageTitle title="Sign Up" />
        <Typography className="page-subtitle">Create your Fundoo Account</Typography>
        <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
        <TextField id="first-name" className="sign-input" label="First Name" size="small" variant="outlined" error={this.state.isFirstNameInvalid} helperText="Enter name with First Letter Capital" />
        </Grid>
        <Grid item md={6} xs={12}>
        <TextField id="last-name" className="sign-input" label="Last Name" size="small" variant="outlined" error={this.state.isLastNameInvalid} helperText="Enter name with First Letter Capital" />
        </Grid>
        </Grid>
        <TextField id="email" className="sign-input" label="Email Id" size="small" variant="outlined" error={this.state.isEmailInvalid} helperText="Enter proper Email Id" />
        <TextField id="password-first" type={this.state.showFirstPassword ? 'text' : 'password'} className="sign-input" label="Enter Password" size="small" variant="outlined" InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowFirstPassword}
                >
                {this.state.showFirstPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
                ),
            }} error={this.state.isFirstPasswordInvalid} helperText="Use at least 8 characters. One Uppercase One Lowercase One special character and One number atleast."  />
            <TextField
            variant="outlined"
            id="password-second"
            size="small"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Re-enter Password"
            className="sign-input" 
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                    ),
                }}
                error={this.state.isSecondPasswordinvalid} 
                helperText={this.state.doPasswordsMatch ? '':'Passwords should match' }
                />
                <CardActions className="sign-buttons" >
                <div className="sign-links">
                <Link to={"/"} className="sign-link" >
                Sign In Instead
                </Link>
                </div>
                <Button onClick={this.handleSignUp} variant="contained" color="primary">
                Sign Up
                </Button>
                </CardActions>
                </Grid>
                <Grid item md={1} ></Grid>
                </CardContent>
                </Card>
                </Grid>
                <Grid item md={3} />
                </Grid>
                );
            }
        }
        
        export default SignUp;
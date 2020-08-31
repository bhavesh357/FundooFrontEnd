import React from 'react';
import { Card, CardContent, Grid, Typography, TextField, CardActions, Button, Snackbar } from '@material-ui/core';
import FundooLogo from './../FundooLogo';
import PageTitle from './../PageTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class ResetPassword extends React.Component{
    state = {
        firstPassword: false,
        secondPassword: false,
        isFirstPasswordInvalid: false,
        isSecondPasswordinvalid: false,
        doPasswordsMatch: true,
    };
    
    handleClickShowFirstPassword = () => {
        this.setState(state => ({ firstPassword: !state.firstPassword }));
    };
    
    handleClickShowSecondPassword = () => {
        this.setState(state => ({ secondPassword: !state.secondPassword }));
    };
    
    handleNext = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@#!$%^&*()_]{8,})[A-Za-z0-9]+?[@#!$%^&*()_][A-Za-z0-9]{1,}?$/;
        let firstPassword= document.getElementById("password-first").value;
        let secondPassword= document.getElementById("password-second").value;
        let firstPasswordStatus= this.validateInput(firstPassword,passwordRegex);
        let secondPasswordStatus= this.validateInput(secondPassword,passwordRegex);
        let passwordMatchStatus= this.checkIfSame(firstPassword,secondPassword,firstPasswordStatus,secondPasswordStatus);
        this.setState({
            isFirstPasswordInvalid: firstPasswordStatus,
            isSecondPasswordinvalid: secondPasswordStatus,
            doPasswordsMatch: passwordMatchStatus,
        });
        if( passwordMatchStatus ){
            this.resetWithData(firstPassword);
        }
    };
    
    resetWithData(password){
        Axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/reset-password?access_token='+this.props.match.params.token, {
        "newPassword": password,
    })
    .then((response) => {
        console.log(response);
        let messageSnackbar = response.status===204 ? "Successfully resetted the password": "" ;
        this.setState({
            snackbarMessage: messageSnackbar,
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

    return (
        
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
        <Grid item md={10}>
        <FundooLogo />
        <PageTitle title="Reset Your Password" />
        <Typography className="page-subtitle">
        Enter your new Password
        </Typography>
        <TextField 
        type={this.state.firstPassword ? 'text' : 'password'}
        id="password-first"
        className="sign-input" label="Enter Password" variant="outlined"  InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowFirstPassword}
                >
                {this.state.firstPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
                ),
            }}
            error={this.state.isFirstPasswordInvalid} helperText="Use at least 8 characters. One Uppercase One Lowercase One special character and One number atleast."  
            ></TextField>
            <TextField 
            id="password-second"
            type={this.state.secondPassword ? 'text' : 'password'}
            className="sign-input" label="Re-enter Password" variant="outlined"  InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowSecondPassword}
                    >
                    {this.state.isSecondPasswordinvalid ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                    ),
                }}
                error={this.state.isSecondPasswordinvalid || !this.state.doPasswordsMatch} 
                helperText={this.state.doPasswordsMatch ? '':'Passwords should match' }
                ></TextField>
                <CardActions className="sign-buttons">
                <Link to={"/"} className="sign-link" >
                Back
                </Link>
                <Link to={"/resetpassword"} className="sign-link" >
                Reset Password
                </Link>
                <Button onClick={this.handleNext} variant="contained" color="primary">
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
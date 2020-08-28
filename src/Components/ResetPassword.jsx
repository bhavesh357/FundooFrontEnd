import React from 'react';
import { Card, CardContent, Grid, Typography, TextField, CardActions, Button } from '@material-ui/core';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';

class ResetPassword extends React.Component{
    state = {
        firstPassword: false,
        secondPassword: false,
        isFirstPasswordInvalid: false,
        isSecondPasswordinvalid: false,
        doPasswordsMatch: false,
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
        let secondPasswordStatus= this.validateInput(firstPassword,passwordRegex);
        this.setState({
            isFirstPasswordInvalid: firstPasswordStatus,
            isSecondPasswordinvalid: secondPasswordStatus,
            doPasswordsMatch: this.checkIfSame(firstPassword,secondPassword,firstPasswordStatus,secondPasswordStatus),
        });
    };

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
                    {this.state.secondPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                    ),
                }}
                error={this.state.isSecondPasswordinvalid} 
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
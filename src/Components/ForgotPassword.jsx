import React from 'react';
import { Card, CardContent, Grid, Typography, TextField, CardActions, Button, Snackbar } from '@material-ui/core';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class ForgotPassword extends React.Component{
    state = {
        isEmailInvalid: false,
        snackbarMessage:"hello",
        snackbarStatus:false,
    };
    
    handleNext = () => {
        const emailRegex = /^[\w\d]{1,}[.\\\-#!]?[\w\d]{1,}@[\w\d]{1,}.[a-z]{2,3}.?([a-z]{2})?$/;
        let email= document.getElementById("email").value;
        let emailStatus = this.validateInput(email,emailRegex);
        this.setState({
            isEmailInvalid: emailStatus,
        });
        if(!emailStatus){
            this.resetWithdata(email);
        }
        
    }
    
    resetWithdata(email){
        Axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/reset', {
        "email": email,
    })
    .then((response) => {
        console.log(response);
        this.setState({
            snackbarMessage: response.data.message,
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
        autoHideDuration={5000}
        message={this.state.snackbarMessage}
        
        />
        <Grid item md={4} />
        <Grid item container md={4}>
        <Card className="card">
        <CardContent className="card-content">
        <Grid item md={1}></Grid>
        <Grid item md={10}  xs={10}>
        <FundooLogo />
        <PageTitle title="Find Your Password" />
        <Typography className="page-subtitle">
        Enter your recovery Email
        </Typography>
        <TextField id="email" className="sign-input" label="Email Id" size="small" variant="outlined" error={this.state.isEmailInvalid} helperText="Enter proper Email Id" />
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

export default ForgotPassword;
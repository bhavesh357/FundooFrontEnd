import React from 'react';
import { Card, CardContent, Grid, Typography, TextField, CardActions, Button } from '@material-ui/core';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';

class ForgotPassword extends React.Component{
    state = {
        isEmailInvalid: false,
    };

    handleNext = () => {
        const emailRegex = /^[\w\d]{1,}[.\\\-#!]?[\w\d]{1,}@[\w\d]{1,}.[a-z]{2,3}.?([a-z]{2})?$/;
        let email= document.getElementById("email").value;
        this.setState({
            isEmailInvalid: this.validateInput(email,emailRegex),
        });
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
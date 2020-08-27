import React from 'react';
import { Card, CardContent, Grid, Typography, TextField, CardActions, Button } from '@material-ui/core';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import { Link } from 'react-router-dom';

class ForgotPassword extends React.Component{
    render(){
        return (
            
            <Grid container>
            <Grid item md={4} />
            <Grid item container md={4}>
            <Card id="forgot-password">
            <CardContent class="card-content">
            <Grid item md={1}></Grid>
            <Grid item md={10}>
            <FundooLogo />
            <PageTitle title="Find Your Password" />
            <Typography class="page-subtitle">
            Enter your recovery Email
            </Typography>
            <TextField className="sign-input" label="Email Id" variant="outlined"  ></TextField>
            <CardActions class="sign-buttons">
            <Link to={"/"} className="sign-link" >
            Back
            </Link>
            <Link to={"/resetpassword"} className="sign-link" >
            Reset Password
            </Link>
            <Button variant="contained" color="primary">
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
import React from 'react';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Card } from '@material-ui/core';

class SignIn extends React.Component{
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
                    <TextField className="sign-input" label="Email" variant="outlined" />
                </Grid>
                <Grid item md={1} ></Grid>
            </Grid>
            <Grid item md={12} container>
                <Grid item md={1} ></Grid>
                <Grid item md={10} >
                    <TextField id="outlined-basic" className="sign-input" label="Password" variant="outlined" />
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
            <Button variant="contained" color="primary">
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
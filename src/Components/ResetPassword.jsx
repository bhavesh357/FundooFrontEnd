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
    };
    
    handleClickShowFirstPassword = () => {
        this.setState(state => ({ firstPassword: !state.firstPassword }));
    };

    handleClickShowSecondPassword = () => {
        this.setState(state => ({ secondPassword: !state.secondPassword }));
    };

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
                }}></TextField>
                <TextField 
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
                }}></TextField>
            <CardActions className="sign-buttons">
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
    
    export default ResetPassword;
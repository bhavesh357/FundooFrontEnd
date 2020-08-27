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
import { Card } from '@material-ui/core';

class SignUp extends React.Component{
    state = {
        showPassword: false,
    };
    
    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };
    
    render(){
        return(
            <Card id="sign-up">
            <Grid container  className="mdc-card mdc-card--outlined">
            <Grid item container md={12} >
            <Grid item md={12} >
            <FundooLogo />
            </Grid>
            <Grid item md={12} >
            <PageTitle title="Sign Up" />
            <div className="page-subtitle">Create your Fundoo Account</div>
            </Grid>
            </Grid>
            <Grid item container md={12}>
            </Grid>
            <Grid item md={1} ></Grid>
            <Grid item md={10} container>
            <Grid item md={6} className="sign-up-input" >
            <TextField className="sign-input" label="First Name" size="small" variant="outlined" />
            </Grid>
            <Grid item md={6} className="sign-up-input">
            <TextField className="sign-input" label="Last Name" size="small" variant="outlined" />
            </Grid>
            </Grid>
            <Grid item md={1} ></Grid>
            <Grid item md={12} container>
            <Grid item md={1} ></Grid>
            <Grid item md={10} className="sign-up-input" container>
            <TextField className="sign-input" label="Email Id" size="small" variant="outlined" />
            </Grid>
            <Grid item md={1} ></Grid>
            </Grid>
            <Grid item container md={12}>
            <Grid item md={1} ></Grid>
            <Grid item md={10} container>
            <Grid item md={6} className="sign-up-input" >
            <TextField type="password" className="sign-input" label="Enter Password" size="small" variant="outlined" />
            </Grid>
            <Grid item md={6} className="sign-up-input">
            <TextField
            variant="outlined"
            size="small"
            type={this.state.showPassword ? 'text' : 'password'}
            label="Password"
            className="sign-input" 
            value={this.state.password}
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
                />
                </Grid>
                </Grid>
                <Grid item md={1} ></Grid>
                </Grid>
                </Grid>
                <Grid container >
                     <Grid item md={1}></Grid>
                     <Grid item md={10}>
                     <div className="sign-buttons" >
                <div className="sign-links">
                <Link to={"/"} className="sign-link" >
                Sign In Instead
                </Link>
                </div>
                <Button variant="contained" color="primary">
                Sign in
                </Button>
                </div>
                </Grid>
                     <Grid item md={1}></Grid>
                </Grid>
                </Card>
                );
            }
        }
        
        export default SignUp;
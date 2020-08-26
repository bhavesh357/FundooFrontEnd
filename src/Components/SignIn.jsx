import React from 'react';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';

class SignIn extends React.Component{
    render(){
        return(
            <div id="sign-in">
            <FundooLogo />
            <PageTitle title="Sign in" />
            <div className="page-subtitle">Continue to Fundoo</div>
            <div className="sign-input-row" >
            <TextField id="outlined-basic" className="sign-input" label="Email" variant="outlined" />
            <TextField id="outlined-basic" className="sign-input" label="Password" variant="outlined" />
            </div> 
            <div className="sign-buttons" >
            <div className="sign-links">
            <Link to={"#"} className="sign-link" >
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
            </div>
            );
        }
    }
    
    export default SignIn;
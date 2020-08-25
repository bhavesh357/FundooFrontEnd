import React from 'react';
import FundooLogo from './FundooLogo';
import PageTitle from './PageTitle';

class SignIn extends React.Component{
    render(){
        return(
            <div id="sign-in">
                <FundooLogo />
                <PageTitle title="Sign in" />
            </div>
        );
    }
}

export default SignIn;
import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/pages/SignIn';
import SignUp from './Components/pages/SignUp';
import ForgotPassword from './Components/pages/ForgotPassword';
import ResetPassword from './Components/pages/ResetPassword';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignIn}></Route>
          <Route path='/signup' exact component={SignUp}></Route>
          <Route path='/forgotpassword' exact component={ForgotPassword}></Route>
          <Route path={'/resetpassword/:token'} component={ResetPassword}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/pages/SignIn';
import SignUp from './Components/pages/SignUp';
import ForgotPassword from './Components/pages/ForgotPassword';
import ResetPassword from './Components/pages/ResetPassword';
import Dashboard from './Components/pages/Dashboard';
import Search from './Components/pages/Search';
import { ProtectedRoute } from './Service/protectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignIn}></Route>
          <Route path='/signup' exact component={SignUp}></Route>
          <Route path='/forgotpassword' exact component={ForgotPassword}></Route>
          <Route path={'/resetpassword/:token'} component={ResetPassword}></Route>
          <Route path={'/dashboard/search'} exact component={Search}></Route>
          <ProtectedRoute path={'/dashboard/:page'} component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

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
import NotFoundPage from './Components/pages/NotFoundPage';
import {SnackbarProvider} from './Components/SnachBarContext'

function App() {
  return (
    <SnackbarProvider>
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignIn}></Route>
          <Route path='/signup' exact component={SignUp}></Route>
          <Route path='/forgotpassword' exact component={ForgotPassword}></Route>
          <Route path={'/resetpassword/:token'} component={ResetPassword}></Route>
          <ProtectedRoute path={'/dashboard/search'} exact component={Search}></ProtectedRoute>
          <ProtectedRoute path={'/dashboard/:page'} component={Dashboard} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
    </SnackbarProvider>
  );
}

export default App;

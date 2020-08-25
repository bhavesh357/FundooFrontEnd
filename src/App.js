import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/SignIn';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={SignIn}></Route>
          <Route path='/signUp' exact component={SignIn}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

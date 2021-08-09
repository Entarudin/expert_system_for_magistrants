import React from 'react';
import './App.css';
import {RequestPostLogin} from './request/RequestPostLogin'
import {PostRequestRegistration} from './request/RequestPostReqistration'
import UserPages from './pages/UserPages';
import TestPages from './pages/Test';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return <div className="App">
  <Router>
    <Switch>
      <Route exact path="/auth/login">
        <RequestPostLogin />
      </Route>
      <Route exact path="/auth/registration">
        <PostRequestRegistration />
      </Route>


      <Route exact path="/test">
       <TestPages />
      </Route>
      <Route path="/users/:id">
        <UserPages />
      </Route>
    </Switch>
  </Router>
  </div>
}

export default App;

import React from 'react';
import './App.css';
import {RequestPostLogin} from './request/Login/RequestPostLogin'
import {PostRequestRegistration} from './request/Registration/RequestPostReqistration'
import { UpdateDateUser } from './request/updateDataOnUser/UpdateDateUser';
import { UpdatePassword } from './request/updatePassword/UpdatePassword';
import MainPage from './components/pages/MainPage/MainPage'
import UserPages from './components/pages/UserPages/UserPages';
import TestPages from './components/pages/Test/Test';
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

      <Route exact path="/users/updatedata">
        <UpdateDateUser />
      </Route>

      <Route exact path="/users/updatepassword">
        <UpdatePassword />
      </Route>

      <Route exact path="/" component={MainPage}/>



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

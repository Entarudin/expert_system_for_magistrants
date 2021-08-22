import React from 'react';
import './App.css';
import {RequestPostLogin} from './request/Login/RequestPostLogin'
import PostRequestRegistration from './request/Registration/RequestPostReqistration'
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
import InformationPage from './components/pages/InformationPage/InformationPage';
import AppliedInformaticsPage from './components/pages/AppliedInformaticsPage/AppliedInformaticsPage';
import AutomatedSystemsPage from './components/pages/AutomatedSystemsPage/AutomatedSystemsPage';
import ErgoDesignPage from './components/pages/ErgoDesignPage/ErgoDesignPage';
import HighPerformanceSystemsPage from './components/pages/HighPerformanceSystemsPage/HighPerformanceSystemsPage';
import InformationalAnalyticalSystemsPage from './components/pages/InformationalAnalyticalSystemsPage/InformationalAnalyticalSystemsPage';
import IntelligentSystemsPage from './components/pages/IntelligentSystemsPage/IntelligentSystemsPage';
import MathModelingPage from './components/pages/MathModelingPage/MathModelingPage';

import SystemEngineeringPage from './components/pages/SystemEngineeringPage/SystemEngineeringPage';
import SystemIntegrationPage from './components/pages/SystemIntegrationPage/SystemIntegrationPage'; 
import SoftwarePage from './components/pages/SoftwarePage/SoftwarePage';

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
    {/* страница с направлениями */}
    <Route exact path="/information_page" component={InformationPage}/>
    
    <Route exact path="/information_page/AppliedInformaticsPage" component={ AppliedInformaticsPage}/>
    <Route exact path="/information_page/AutomatedSystemsPage" component={ AutomatedSystemsPage}/>
    <Route exact path="/information_page/ErgoDesignPage" component={ ErgoDesignPage}/>
    <Route exact path="/information_page/HighPerformanceSystemsPage" component={ HighPerformanceSystemsPage}/>
    <Route exact path="/information_page/InformationalAnalyticalSystemsPage" component={ InformationalAnalyticalSystemsPage}/>
    <Route exact path="/information_page/IntelligentSystemsPage" component={ IntelligentSystemsPage}/>
    <Route exact path="/information_page/MathModelingPage" component={ MathModelingPage}/>
    <Route exact path="/information_page/SystemEngineeringPage" component={ SystemEngineeringPage}/>
    <Route exact path="/information_page/SystemIntegrationPage" component={ SystemIntegrationPage}/>
    <Route exact path="/information_page/SoftwarePage" component={ SoftwarePage}/>


    </Switch>
  </Router>
  </div>
}

export default App;

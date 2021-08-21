import React from 'react';
import { RequestGetQuestionES } from '../../../request/getQuestionOnES/RequestGetQuestionES';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
  } from "react-router-dom";
import Header from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';

class TestPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
       
    }
    async componentDidMount() {
   

    }



    render() {
      
        return (
            <> 
            <Header />
            <RequestGetQuestionES />
            <Footer />
             </>  
        );
    }
}

export default withRouter(TestPages); 
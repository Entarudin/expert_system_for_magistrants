import React from 'react';
import { RequestGetQuestionES } from '../../request/getQuestionOnES/RequestGetQuestionES';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
  } from "react-router-dom";


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
            <RequestGetQuestionES />
             </>  
        );
    }
}

export default withRouter(TestPages); 
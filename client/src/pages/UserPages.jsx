import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
  } from "react-router-dom";
import '../App.css'

class UserPages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          user:{},
          resultOnUserPage: []

        };
       
    }
    async componentDidMount() {
        // GET request using fetch with async/await
        const response = await fetch(`http://localhost:5000/auth/users/${localStorage.getItem('id')}`);
        const data = await response.json();
        console.log(data)
        this.setState({ user: data })
        this.getResultfromLocalStorage();
        console.log(localStorage.getItem("result"))
    }

    getResultfromLocalStorage = async () => {
            try {
            
              this.setState({resultOnUserPage:JSON.parse(localStorage.getItem("result"))})

            }catch(e){
                console.log(e)
            }
    }
    logout = () => {
        localStorage.setItem('id', '');
        localStorage.setItem('token', '');
        this.forceUpdate()
    }

    testOnEs =() =>{
        this.props.history.push('/test')
    }

    render() {
        const{username} = this.state.user
        localStorage.getItem('res')
    
        return (
            <> 
                {!localStorage.getItem('id') && (
                    <Redirect to={`/`}/>
                )}
                <div className="mainUser">
                    <p>Username is {username } </p>
                 
                    <button  onClick={this.logout}>logout</button>
                    <button onClick={this.testOnEs}> Пройти еще раз </button>
                    { Array.isArray(this.state.resultOnUserPage) && Boolean(this.state.resultOnUserPage.length) && 
                        this.state.resultOnUserPage.map(item =>(
                            <div>
                                 <img className="img_small" src={"http://127.0.0.1:6969/api/get_img_by_id?img_id="+ item.img}  alt="logo" />
                                    <div>{Array.isArray(item.resultAnswer) && Boolean( item.resultAnswer.length) && item.resultAnswer.map(itemResultAnswer =>(
                                        <div>
                                            {itemResultAnswer.lesson_type} {itemResultAnswer.per_cent}

                                        </div>
                                    ))}</div>


                               
                            </div>
                               
                        ))
                        
                        }
                </div>
            </>
      
        );
    }
}

export default withRouter(UserPages); 
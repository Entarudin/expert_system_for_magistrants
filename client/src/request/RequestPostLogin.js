import React from 'react';
import jwt_decode from "jwt-decode";
import {
    Redirect,
  } from "react-router-dom";
import  secret  from '../config';

class RequestPostLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username:"",
            password:""
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword=this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.funcPost = this.funcPost.bind(this)
    }
handleChangeUsername(event){
    this.setState({
        username : event.target.value
    })
}
handleChangePassword(event){
    this.setState({
        password : event.target.value
    })
}

handleSubmit(event){
    let USER ={
        username: this.state.username,
        password: this.state.password
    }
    this.funcPost(USER);
    event.preventDefault()
}

    async funcPost(USER) {
        // POST request using fetch with async/await
         
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(USER)
        };
        const response = await fetch('http://localhost:5000/auth/login', requestOptions);
        const data = await response.json();
        // console.log(data)
        try {
        let token = data.token
        let {id, roles} = jwt_decode(token)
        // console.log( decoded )
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        // console.log(id)
        // console.log(roles)
        // <Redirect to={`/users/${id}`} />
        this.forceUpdate();


          } catch(error) {
            console.log("Шото произошло с декодировкой токена")
          }
       
    }

    render() {
        const userId = localStorage.getItem('id');
        return (
            <div className="card text-center m-3">
                {localStorage.getItem('id') && (
                    <Redirect to={`/users/${userId}`}/>
                )}
                <h5 className="card-header">POST Request with Async/Await</h5>
                <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                <label>
                  Имя :
                  <input  type ="text" name="name" value ={this.state.value} onChange={this.handleChangeUsername}/>
              </label>
              <label>
              Пароль:
                  <input  type ="text" name="name" value ={this.state.value} onChange={this.handleChangePassword}/>

              </label>
              <input type ="submit" value = "Отправить"/>
    
                </form>
                </div>
            </div>
        );
    }
}

export { RequestPostLogin }; 
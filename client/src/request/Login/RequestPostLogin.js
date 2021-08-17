import React from 'react';
import jwt_decode from "jwt-decode";
import {
    Redirect,
    NavLink,
  } from "react-router-dom";
import './LoginPage.css'

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

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(USER)
        };
        const response = await fetch('http://localhost:5000/auth/login', requestOptions);
        const data = await response.json();
        try {
            let token = data.token
            let {id} = jwt_decode(token)
            localStorage.setItem('id', id);
            localStorage.setItem('token', token);
            this.forceUpdate();
          } catch(error) {
            console.log("Введены неверно данные")
          }
       
    }

    render() {
        const userId = localStorage.getItem('id');
        return (
            <div className="Main">
            <div className="pole">
                {localStorage.getItem('id') && (
                    <Redirect to={`/users/${userId}`}/>
                )}
             <p className="login_title"> Вход в систему </p>
                <form onSubmit={this.handleSubmit}>
                
                  <input  
                  type ="text" 
                  name="name" 
                  className="loginInput"
                  value ={this.state.value}
                   onChange={this.handleChangeUsername}
                   placeholder="Электронная почта"
                   maxLength="30"
                   />
         
                  <input  type ="password"
                   name="name"
                   className="loginInput"
                    value ={this.state.value}
                     onChange={this.handleChangePassword}
                     placeholder="Пароль"
                     maxLength="12"
                     />

 
              <input type ="submit" className="login_button" value = "Войти"/>
    
                </form>
                <NavLink to='/auth/registration'> <button className="login_button_reg">Зарегистрироваться</button></NavLink>
                </div>
                </div>
        );
    }
}

export { RequestPostLogin }; 
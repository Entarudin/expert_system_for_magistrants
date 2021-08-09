import React from 'react';
import validator from 'validator';
import {isLength} from 'validator'
import '../App.css'
/* prevuniversity,speciality,dateofbirth,phonenumber */
class PostRequestRegistration extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            errors: '',
            username:"",
            password:"",
            prevuniversity:"",
            speciality:"",
            dateofbirth:"",
            phonenumber:"",
            returnPassword:""  
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
    try{
        if(!validator.isEmail(this.state.username))  throw new Error ("Введите адрес электронной почты в формате proverka@example.com");
        if(!isLength(this.state.password , {min:4, max:12})) throw new Error("Пароль должен быть больше 4  и меньше 12 символов")
       
     let USER = {
        username:this.state.username,
        password: this.state.password
    }
   this.funcPost(USER)    
    } catch(e){
      console.log(e.message)

    }
     event.preventDefault()
}

    async funcPost(USER) {
        // POST request using fetch with async/await
         
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(USER)
        };
        const response = await fetch('http://localhost:5000/auth/registration', requestOptions);
        const data = await response.json();
        
        console.log(data);
       
    }

    render() {
      
        return (
            <div className="card text-center m-3">
                <h5 className="card-header">Registration</h5>
                <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                    {/*<label>
                  ФИО:
                 // <input  type ="text" name="name" value ={this.state.value} onChange={}/>
              </label>
              <label>
                  Предыдущее учебное заведение:
                  <input  type ="text" name="name" value ={this.state.value} onChange={}/>
              </label>
              <label>
                  Специальность:
                  <input  type ="text" name="name" value ={this.state.value} onChange={}/>
              </label>
              <label>
                  Дата рождения:
                  <input  type ="text" name="name" value ={this.state.value} onChange={}/>
              </label>
              <label>
                  Номер телефона:
                  <input  type ="text" name="name" value ={this.state.value} onChange={}/>
              </label>



                 */}
                <label>
                  Электронная почта :
                  <input  type ="text" name="name" value ={this.state.value} onChange={this.handleChangeUsername}/>
              </label>
              <label>
              Пароль:
                  <input  type ="text" name="name" value ={this.state.value} onChange={this.handleChangePassword}/>

              </label>
              <label>
              Повторите пароль:
                  <input  type ="text" name="name" value ={this.state.value} />

              </label>
              <input type ="submit" value = "Отправить"/>
    
                </form>
                </div>
            </div>
        );
    }
}

export { PostRequestRegistration }; 
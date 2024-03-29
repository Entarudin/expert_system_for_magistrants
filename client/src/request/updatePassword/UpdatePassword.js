import React from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import {isLength} from 'validator'
import './changePassword.css'
import Header from '../../components/organisms/Header/Header';
import Footer from '../../components/organisms/Footer/Footer';
class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            succes:"",
            errors: '',
            username:"",
            prevuniversity:"",
            speciality:"",
            dateofbirth:"",
            phonenumber:"",
            fullname:"",
            password:"",
            returnPassword:"",
            user:{}
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangePassword=this.handleChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.funcPost = this.funcPost.bind(this)
        this.handleChangeFullname=this.handleChangeFullname.bind(this)
        this.handleChangePrevUniversity=this.handleChangePrevUniversity.bind(this)
        this.handleChangeSpeciality=this.handleChangeSpeciality.bind(this)
        this.handleChangeDateOfBirthday= this.handleChangeDateOfBirthday.bind(this)
        this.handleChangePhoneNumber= this.handleChangePhoneNumber.bind(this)
        this.handleChangeReturnPassword = this.handleChangeReturnPassword.bind(this)
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

handleChangeFullname(event){
    this.setState({
        fullname : event.target.value
    })
}

handleChangePrevUniversity(event){
    this.setState({
        prevuniversity : event.target.value
    })

}
    handleChangeSpeciality(event){
        this.setState({
            speciality : event.target.value
        })
    }

    handleChangeDateOfBirthday(event){
        this.setState({
            dateofbirth : event.target.value
        })
    }

    handleChangePhoneNumber(event){
        this.setState({
            phonenumber : event.target.value
        })
    }
    handleChangeReturnPassword(event){
        this.setState({
            returnPassword : event.target.value
        })
    }

     



handleSubmit(event){
    try{
       
        if(!isLength(this.state.password , {min:4, max:12})) throw new Error("Пароль должен быть больше 4  и меньше 12 символов")
        if (!(this.state.password === this.state.returnPassword)) throw new Error("Пароли не совпадают")
        
        
        let USER = {
        id:localStorage.getItem('id'),
        newpassword:this.state.password
    }
   this.funcPost(USER)    
    } catch(e){
      console.log(e.message)
      this.setState({errors:"*"+e.message})

    }
     event.preventDefault()
}

    async funcPost(USER) {
    
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(USER)
        };
        const response = await fetch('http://localhost:5000/auth/users/update_password', requestOptions);
        const data = await response.json();
        this.setState({succes:data.message})
        
        console.log(data);
       
    }

    render() {
      
        return (
           
            <div>
                <Header /> 
            <p className="PasswordEditingTitle">Изменить пароль</p>
            <div className="UserEditingPassword"> 
                
                 
                
                    <input  type ="password"
                   name="name"
                    value ={this.state.value}
                     onChange={this.handleChangePassword}
                     placeholder="Новый Пароль"
                     className="big_input_editing"
                     maxLength="12"
                     />

             
                  <input 
                   type ="password" 
                   name="name" 
                   value ={this.state.value} 
                   onChange={this.handleChangeReturnPassword}
                   placeholder="Повторите пароль"
                   className="big_input_editing"
                   maxLength="12"

                   />
       <p className="errorOnUpdatePasword">{this.state.errors}</p>
       <p className="succesOnUpdatePasword">{this.state.succes}</p>

       <NavLink to='/auth/login'><button className="editing_button">
               Отменить
            </button></NavLink>

              <input type ="submit" className="editing_button" value = "сохранить" onClick={this.handleSubmit}/>

                
                </div>
                <Footer />
            </div>
        );
    }
}

export { UpdatePassword }; 
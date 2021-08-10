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
            returnPassword:"",
            fullname:""  
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
        if(!validator.isEmail(this.state.username))  throw new Error ("Введите адрес электронной почты в формате proverka@example.com");
        if(!isLength(this.state.password , {min:4, max:12})) throw new Error("Пароль должен быть больше 4  и меньше 12 символов")
        if(!validator.isLength(this.state.prevuniversity, {min:4, max:12})) throw new Error ("Поле предыдущего учебного заведения должно быть больше 3")
        if(!validator.isLength(this.state.speciality,{min:3})) throw new Error ("Поле специальности должно быть больше 3")
        if(!validator.isDate(this.state.dateofbirth)) throw new Error ("Неверно введена дата рождения, введите в формате [2002-07-15]")
        if (!validator.isMobilePhone(this.state.phonenumber)) throw new Error ("Неверно введен номер телефона")
        if(!isLength(this.state.fullname, {min:3})) throw new Error("ФИО должно быть больше 3")
        if (!(this.state.password === this.state.returnPassword)) throw new Error("Пароли не совпадают")
        
        let USER = {

        username:this.state.username,
        fullname:this.state.fullname,
        prevuniversity:this.state.prevuniversity,
        speciality:this.state.speciality,
        dateofbirth:this.state.dateofbirth,
        phonenumber:this.state.phonenumber,
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
                 
                 <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangeFullname}
                 placeholder="ФИО"
                 />

                <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangePrevUniversity}
                 placeholder="Предыдущее учебное заведение"
                 />

                <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangeSpeciality}
                 placeholder="Специальность"
                 />

                <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangeDateOfBirthday}
                 placeholder="Дата рождения"
                 />

                <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangePhoneNumber}
                 placeholder="Номер телефона"
                 />

               
                  <input  type ="text"
                   name="name" 
                   value ={this.state.value} 
                   onChange={this.handleChangeUsername}
                   placeholder ="Электронная почта"
                   />
       
                  <input  type ="text"
                   name="name"
                    value ={this.state.value}
                     onChange={this.handleChangePassword}
                     placeholder="Пароль"
                     />

             
                  <input 
                   type ="text" 
                   name="name" 
                   value ={this.state.value} 
                   onChange={this.handleChangeReturnPassword}
                   placeholder="Повторите пароль"

                   />

             
              <input type ="submit" value = "Отправить"/>
    
                </form>
                </div>
            </div>
        );
    }
}

export { PostRequestRegistration }; 
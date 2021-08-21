import React from 'react';
import validator from 'validator';
import {isLength} from 'validator'
import {NavLink} from 'react-router-dom'
import Header from '../../components/organisms/Header/Header';
import Footer from '../../components/organisms/Footer/Footer';
import './UserEditing.css';
class UpdateDateUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            succes: '',
            error: '',
            username:"",
            prevuniversity:"",
            speciality:"",
            dateofbirth:"",
            phonenumber:"",
            fullname:"",
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

        async componentDidMount() {
        const response = await fetch(`http://localhost:5000/auth/users/${localStorage.getItem('id')}`);
        const data = await response.json();
        console.log(data)
        this.setState({ user: data , fullname:data.fullname, username:data.username,
            prevuniversity:data.prevuniversity,speciality:data.speciality,
            dateofbirth:data.dateofbirth , phonenumber:data.phonenumber})

        }



handleSubmit(event){
    try{
        if(!validator.isEmail(this.state.username))  throw new Error ("Введите адрес электронной почты в формате proverka@example.com");
        if(!validator.isLength(this.state.prevuniversity, {min:3, max:12})) throw new Error ("Поле предыдущего учебного заведения должно быть больше 3")
        if(!validator.isLength(this.state.speciality,{min:3})) throw new Error ("Поле специальности должно быть больше 3")
        if(!validator.isDate(this.state.dateofbirth)) throw new Error ("Неверно введена дата рождения, введите в формате [2002-07-15]")
        if (!validator.isMobilePhone(this.state.phonenumber)) throw new Error ("Неверно введен номер телефона")
        if(!isLength(this.state.fullname, {min:3})) throw new Error("ФИО должно быть больше 3")
        
        let USER = {
        id:localStorage.getItem('id'),
        username:this.state.username,
        fullname:this.state.fullname,
        prevuniversity:this.state.prevuniversity,
        speciality:this.state.speciality,
        dateofbirth:this.state.dateofbirth,
        phonenumber:this.state.phonenumber,
    }
   this.funcPost(USER)    
    } catch(e){
      console.log(e.message)
      this.setState({error : "*"+ e.message})

    }
     event.preventDefault()
}

    async funcPost(USER) {
         
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(USER)
        };
        const response = await fetch('http://localhost:5000/auth/users/update_on_user', requestOptions);
        const data = await response.json();
        this.setState({succes:data.message})
        
        console.log(data);
       
    }

    render() {
      
        return (
         <div>
         <Header />
         <p className="UserEditingTitle">Редактирование профиля</p>
      <div className="UserEditing"> 
                
              
                 
                 <input  type ="text" 
                 name="name" 
                 value ={this.state.fullname} 
                 onChange={this.handleChangeFullname}
                 placeholder="ФИО"
                 className="big_input_editing"
                 />

         <div className="smallInputGroup">
     <input  type ="text" 
                 name="name" 
                 value ={this.state.dateofbirth} 
                 onChange={this.handleChangeDateOfBirthday}
                 placeholder="Дата рождения"
                 className="small_input_editing"
                 />



                <input  type ="text" 
                 name="name" 
                 value ={this.state.phonenumber} 
                 onChange={this.handleChangePhoneNumber}
                 placeholder="Номер телефона"
                 className="small_input_editing"
                 />

     </div>

                  
                  <input  type ="text"
                   name="name" 
                   value ={this.state.username} 
                   onChange={this.handleChangeUsername}
                   placeholder ="Электронная почта"
                   className="big_input_editing"
                   />
       

                <input  type ="text" 
                 name="name" 
                 value ={this.state.prevuniversity} 
                 onChange={this.handleChangePrevUniversity}
                 placeholder="Предыдущее учебное заведение"
                 className="big_input_editing"
                 />

                <input  type ="text" 
                 name="name" 
                 value ={this.state.speciality} 
                 onChange={this.handleChangeSpeciality}
                 placeholder="Специальность"
                 className="big_input_editing"
                 />

             


           
        <NavLink to='/auth/login'><button className="editing_button">
               Отменить
            </button></NavLink>

             
              <input type ="submit" 
              onClick={this.handleSubmit}
              value = "Сохранить"
               className="editing_button"/>
    
                
                </div>
                <p className="messageOnError">{this.state.error}</p>
                <p className="messageOnServer">{this.state.succes}</p>
                <Footer />
        </div>
        );
    }
}

export { UpdateDateUser }; 
import React from 'react';
import validator from 'validator';
import {isLength} from 'validator'
import './RegistrationPage.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
    NavLink
  } from "react-router-dom";

class PostRequestRegistration extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isRegistration:false,
            succes:"",
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
        if(!validator.isEmail(this.state.username)) throw new Error ("?????????????? ?????????? ?????????????????????? ?????????? ?? ?????????????? proverka@example.com");
        if(!isLength(this.state.password , {min:4, max:12})) throw new Error("???????????? ???????????? ???????? ???????????? 4  ?? ???????????? 12 ????????????????")
        if(!validator.isLength(this.state.prevuniversity, {min:3, max:12})) throw new Error ("???????? ?????????????????????? ???????????????? ?????????????????? ???????????? ???????? ???????????? 3")
        if(!validator.isLength(this.state.speciality,{min:3})) throw new Error ("???????? ?????????????????????????? ???????????? ???????? ???????????? 3")
        if(!validator.isDate(this.state.dateofbirth)) throw new Error ("?????????????? ?????????????? ???????? ????????????????, ?????????????? ?? ?????????????? [2002-07-15]")
        if (!validator.isMobilePhone(this.state.phonenumber)) throw new Error ("?????????????? ???????????? ?????????? ????????????????")
        if(!isLength(this.state.fullname, {min:3})) throw new Error("?????? ???????????? ???????? ???????????? 3")
        if (!(this.state.password === this.state.returnPassword))throw new Error("???????????? ???? ??????????????????")
        
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
      this.setState({errors:"*"+e.message})

    }
     event.preventDefault()
}

    async funcPost(USER) {
     
         
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(USER)
        };
        const response = await fetch('http://localhost:5000/auth/registration', requestOptions);
        const data = await response.json();
        this.setState({succes:data.message, isRegistration:true})
        this.props.history.push('/auth/login')
        console.log(data);

       
    }

    render() {

      
        return (
        <div className="Main">
         
        <div className="pole">
            <p className="registration_title"> ??????????????????????</p>
              
                 
                 <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangeFullname}
                 placeholder="??????"
                 className="big_input"
                 maxLength="30"
                 />

                <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangePrevUniversity}
                 placeholder="???????????????????? ?????????????? ??????????????????"
                 className="big_input"
                 maxLength="30"
                 />

                <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangeSpeciality}
                 placeholder="???????????????????? ??????????????????????????"
                 className="big_input"
                 maxLength="30"
                 />
        <div className="smallInputGroup">
                <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangeDateOfBirthday}
                 placeholder="???????? ????????????????"
                 className="small_input"
                 maxLength="12"
                 />

                <input  type ="text" 
                 name="name" 
                 value ={this.state.value} 
                 onChange={this.handleChangePhoneNumber}
                 placeholder="?????????? ????????????????"
                 className="small_input"
                 maxLength="12"
                 />

            </div>
                  <input  type ="text"
                   name="name" 
                   value ={this.state.value} 
                   onChange={this.handleChangeUsername}
                   placeholder ="?????????????????????? ??????????"
                   className="big_input"
                   maxLength="30"
                   />

            <div className="smallInputGroup">
                  <input  type ="password"
                   name="name"
                    value ={this.state.value}
                     onChange={this.handleChangePassword}
                     placeholder="????????????"
                     className="small_input"
                     maxLength="12"
                     />

             
                  <input 
                   type ="password" 
                   name="name" 
                   value ={this.state.value} 
                   onChange={this.handleChangeReturnPassword}
                   placeholder="?????????????????? ????????????"
                   className="small_input"
                   maxLength="12"

                   />
        </div>
            
             
              <input type ="submit" className="registration_button" value = "????????????????????????????????????" onClick={this.handleSubmit} />
    

                </div>
                <p className="messageOnErrorRegistation"
                >{this.state.errors}
                </p>
                <p className="messageOnServerRegistation">{this.state.succes}</p>
            </div>
        );
    }
}

     export default withRouter (PostRequestRegistration ); 
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
  } from "react-router-dom";
import '../../App.css'

class UserPages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          user:{},
          resultOnUserPage: [],
          resultDb: 1
        };
       
    }
    async componentDidMount() {
        const response = await fetch(`http://localhost:5000/auth/users/${localStorage.getItem('id')}`);
        const data = await response.json();
        console.log(data)
        this.setState({ user: data })
        this.getResultfromLocalStorage();
        Boolean(localStorage.getItem('id')) && Boolean(!localStorage.getItem('result')) && await this.getResultOnDataBase()
        Boolean(localStorage.getItem('id')) && Boolean(localStorage.getItem('result')) && this.requestResult()
    
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
        localStorage.removeItem('result')
        this.forceUpdate()
    }

    testOnEs =() =>{
        this.props.history.push('/test')
    }

    getResultOnDataBase = async () =>{
        try{
            const idOnlocalstorage= localStorage.getItem('id')
                let userGetResult = {
                    idUser:idOnlocalstorage
                }
            const requestOptionsGetResult = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userGetResult)
            };
            const responseGetResult = await fetch('http://localhost:5000/auth/users/get_result', requestOptionsGetResult);
            const dataResult = await responseGetResult.json();
            
            this.setState({resultOnUserPage:JSON.parse(dataResult.result)})
            console.log(this.state.resultDb)
            if(dataResult.result.length){
                 localStorage.setItem("result",dataResult.result)
            }
           

        }catch(e){
            console.log("fff")
        }
    }

    requestResult = async() => {
        try{
            const reqResLocalstorageOnid = localStorage.getItem('id')
            const reqResLocalstorageOnResult = localStorage.getItem('result')
                let userResult = {
                    idUser:reqResLocalstorageOnid,
                    result:reqResLocalstorageOnResult
                }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userResult)
            };
            const responseResult = await fetch('http://localhost:5000/auth/users/result', requestOptions);
            const dataResult = await responseResult.json();
        }catch(e){

        }
    }

    render() {
        const{username, fullname,dateofbirth,phonenumber,prevuniversity,speciality} = this.state.user
        const {resultOnUserPage=[]} = this.state
        
        


        return (
            <> 
                {!localStorage.getItem('id') && (
                    <Redirect to={`/auth/login`}/>
                )}

                <div className="mainUser">
                    <p>{fullname}</p>
                    <p>Дата рождения: {dateofbirth}</p>
                    <p>Номер: {phonenumber}</p>
                    <p>Почта: {username } </p>
                    <p>Предыдущее учебное заведение: {prevuniversity}</p>
                    <p>Полученная специальность: {speciality}</p>
                 
                    <button  onClick={this.logout}>logout</button>
                    <button onClick={this.testOnEs}> Пройти еще раз </button>
                    { Array.isArray(resultOnUserPage) && Boolean(resultOnUserPage.length) && 
                        resultOnUserPage.map((item,index) =>(
                            <div key={index}>
                                 <img className="img_small" src={"http://127.0.0.1:6969/api/get_img_by_id?img_id="+ item.img}  alt="logo" />
                                    <div >{Array.isArray(item.resultAnswer) && Boolean( item.resultAnswer.length) && item.resultAnswer.map(itemResultAnswer =>(
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
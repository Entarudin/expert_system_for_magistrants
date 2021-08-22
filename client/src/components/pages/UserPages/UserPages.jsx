import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
    NavLink
  } from "react-router-dom";

import './styles.css'
import Footer from '../../organisms/Footer/Footer';
import Header from '../../organisms/Header/Header';
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
        const LenghtOnItemsScroll =  Boolean(Array.isArray(resultOnUserPage)) && resultOnUserPage.length <= 2
        const LenghtOnItemsEmptyScroll = !( resultOnUserPage && Array.isArray(resultOnUserPage) &&  resultOnUserPage.length === 0)
        console.log(LenghtOnItemsEmptyScroll)
        console.log("array", resultOnUserPage)


        return (
            <> 

                {!localStorage.getItem('id') && (
                    <Redirect to={`/auth/login`}/>
                )}
                <Header />
                <div className="mainUser">
                <div className="first_block">
                    <p className="label_on_userpage">
                        Обо мне
                    </p>
                    <div className="user_info">
                        <div className="img_and_fio" >
                         <img className="img_photouser" src="/img/img_userpages.png" alt="photouser" />
                      <p className="p_fio">{fullname}</p>   
                        </div>
                    
                    <p className="p_inf">Дата рождения: {dateofbirth}</p>
                    <p className="p_inf">Номер: {phonenumber}</p>
                    <p className="p_inf">Почта: {username } </p>
                    <p className="p_inf">Предыдущее учебное заведение: {prevuniversity}</p>
                    <p className="p_inf">Полученная специальность: {speciality}</p>
                 
                    
                  <NavLink to ="/users/updatedata" > <button   className="btn_main_pages">Редактировать </button></NavLink>
                  <NavLink to="/users/updatepassword"><button   className="btn_main_pages">Изменить пароль</button></NavLink>
                    
                    <button  onClick={this.logout} className="btn_main_pages">Выйти из системы</button>
                    </div>
                </div>
                    
                    <div className="second_block">
                        <div className="my_result">Мои результаты</div>
                   
                        <div className ="items_on_result" 
                        style={{
                            height: LenghtOnItemsEmptyScroll ? "300px" : "730px"
                        }}
                        >
                         
                            <div 
                            className="result_on_scroll"
                            style ={{
                                overflowY: LenghtOnItemsScroll ? "auto" : "scroll"
                            }}
                            >
       
                               { Array.isArray(resultOnUserPage) && Boolean(resultOnUserPage.length) && 
                             resultOnUserPage.map((item,index) =>(
                            <div>
                            <div  className="block_positioin_result_img"   key={index}>
                                
                                 <img className="img_small" src={"http://127.0.0.1:6969/api/get_img_by_id?img_id="+ item.img}  alt="logo" />
                                    <div >{Array.isArray(item.resultAnswer) && Boolean( item.resultAnswer.length) && item.resultAnswer.map(itemResultAnswer =>(
                                        <div className="item_result_answer_on_result">
                                            {itemResultAnswer.lesson_type}: {itemResultAnswer.per_cent}

                                        </div>
                                    ))}</div>
                                

                              
                            </div>
                            <hr></hr>
                            </div>
                               
                        ))
                        
                        }

                            </div>
                            {LenghtOnItemsEmptyScroll && (
                                                <h1> Вы еще не проходили тестирование</h1>
                                            )}
                        <button onClick={this.testOnEs} className="btn_again"> Пройти тест </button>  
                  
                        </div>
                     
                    </div>
                    
                </div>
                <Footer />
            </>
      
        );
    }
}

export default withRouter(UserPages); 
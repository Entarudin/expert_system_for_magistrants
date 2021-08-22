import React from 'react';
import qs from 'qs';
import './styles.css'
import {
    Redirect,
    NavLink
  } from "react-router-dom";

class RequestGetQuestionES extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalReactPackages: [],
            butOf: false,
            answers: { required_count_of_questions: 10 },
            resultArray: [],
            topThreeAndImg:[],
            id_img:[],
            step: 1 ,
            result :[{
                img: {},
                resultAnswer: {}
            }]
        };
            this.handleChangeRadio = this.handleChangeRadio.bind(this);
            this.onChangeItem = this.onChangeItem.bind(this)
    }

   
    handleChangeRadio(event) {
        this.setState({radio: event.target.value});
      }

  
      handleSubmitFirst = async (event) => {
        event.preventDefault()
      
        const { step } = this.state;

        const qsString = qs.stringify(this.state.answers)
    
        const response = await fetch('http://127.0.0.1:6969/api/categories_by_answers?' + qsString );

         const data = await response.json();
    
         this.setState({ totalReactPackages: [], answers: {}, resultArray: data, step: step + 1 })//для первой
    
      }

      handleSubmitSecond = async (event)=>{
        const { step } = this.state;
          const qsStringSecond =qs.stringify(this.state.answers)
          const response2 = await fetch('http://127.0.0.1:6969/api/result_and_img_id?' + qsStringSecond );
          const data2 = await response2.json();
          
          this.setState({ totalReactPackages: [], answers: {}, resultArray: {}, topThreeAndImg:data2, id_img:data2[0].img_id, result:[{img:data2[0].img_id, resultAnswer:data2.slice(1,4)}] , step: step + 1 })
            this.state.topThreeAndImg.shift()
            console.log(this.state.result)

            try{
                let checkLocalstorage = JSON.parse(localStorage.getItem("result")) ;
                if (checkLocalstorage && checkLocalstorage.length)
                { 
                    localStorage.setItem("result", JSON.stringify([...checkLocalstorage,...this.state.result]))
                }else{
                  localStorage.setItem("result" , JSON.stringify(this.state.result))  
                }
            }
            catch(e){
                console.log(e)
            }
      }

      onChangeItem = (name, id) => {
        const { answers } = this.state
        this.setState({ answers: { ...answers, [name]: id }})
    }

    async componentDidMount() {
        const response = await fetch('http://127.0.0.1:6969/api/get_start_questions');
        const data = await response.json();
        console.log(data);
        this.setState({ totalReactPackages: data})

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
        const { totalReactPackages,resultArray , step, topThreeAndImg, answers} = this.state;
        const countOfQuestions = 15;
        const answersLenghtOnFirstStep = Object.keys(answers).length
        return (
            <div className="card text-center m-3">
            <form onSubmit={this.handleSubmit} id = "myForm" >
                {Boolean(totalReactPackages.length) && totalReactPackages.map((item) => (
                                        <div className="question" key ={item.id}>
                                                <div className="text_answer">{item.text}</div>    

                                           <div classname="position_answer">
                                                 <div className="position_div" >
                                                    
                                                         <input 
                                                    type="radio"
                                                    value="yes" 
                                                    className="a"
                                                    name={item.id}
                                                    onChange={() => this.onChangeItem(item.id, 'yes')}
                                                />  
                                                   
                                              
                                                   <p className="position_p"> да</p>
                                             </div>
                                               
                                               </div>         
                                         
                                               <div classname="position_answer">
                                               <div className="position_div" >
                                                       <input type="radio"
                                                        value="nope"
                                                         name={item.id}
                                                          onChange={() => this.onChangeItem(item.id, 'nope')}
                                                          />
                                                           <p className="position_p"> нет</p>


                                                          </div>
                                                   
                                                    </div>
                                        
                                                    <div classname="position_answer"> 
                                                    <div className="position_div" >
                                                         <input type="radio"
                                                          value="mb_yes" 
                                                          name={item.id} 
                                                          onChange={() => this.onChangeItem(item.id, 'mb_yes')}
                                                          />
                                                          
                                                          <p className="position_p">скорее да </p>
                                                          

                                                          </div>
        
                                                    </div>

                                                    <div classname="position_answer"> 
                                                    
                                                    <div className="position_div">
                                                         <input type="radio"
                                                          value="mb_nope"
                                                           name={item.id} onChange={() => this.onChangeItem(item.id, 'mb_nope')}
                                                           />
                                                            <p className="position_p">скорее нет </p>
                                                           </div>
                                                    </div>
                                        </div>
                                    ))}

                {Boolean(resultArray.length) && (resultArray.map((item) =>(
                                                <div className="question" key ={item.id}>
                                                <div className="text_answer">{item.text}</div>    

                                            <div classname="position_answer">
                                                <div className="position_div" >
                                                    
                                                        <input 
                                                    type="radio"
                                                    value="yes" 
                                                    className="a"
                                                    name={item.id}
                                                    onChange={() => this.onChangeItem(item.id, 'yes')}
                                                />  
                                                
                                            
                                                <p className="position_p"> да</p>
                                            </div>
                                            
                                            </div>         

                                            <div classname="position_answer">
                                            <div className="position_div" >
                                                    <input type="radio"
                                                        value="nope"
                                                        name={item.id}
                                                        onChange={() => this.onChangeItem(item.id, 'nope')}
                                                        />
                                                        <p className="position_p"> нет</p>


                                                        </div>
                                                
                                                    </div>

                                                    <div classname="position_answer"> 
                                                    <div className="position_div" >
                                                        <input type="radio"
                                                        value="mb_yes" 
                                                        name={item.id} 
                                                        onChange={() => this.onChangeItem(item.id, 'mb_yes')}
                                                        />
                                                        
                                                        <p className="position_p">скорее да </p>
                                                        

                                                        </div>

                                                    </div>

                                                    <div classname="position_answer"> 
                                                    
                                                    <div className="position_div">
                                                        <input type="radio"
                                                        value="mb_nope"
                                                        name={item.id} onChange={() => this.onChangeItem(item.id, 'mb_nope')}
                                                        />
                                                            <p className="position_p">скорее нет </p>
                                                        </div>
                                                    </div>
                                            </div>
                )))}
                
                
                
                
                
                        <input type="hidden" value={countOfQuestions} name="required_count_of_questions"/>
                       
                </form>

                {Boolean(topThreeAndImg.length)&& (
                    <>
                        <div className="itog_result">Итоговый результат</div>
                        <div className="position_div_img">
                    
                              <img src={"http://127.0.0.1:6969/api/get_img_by_id?img_id="+ this.state.id_img}  alt="logo" className="img_on_itog" />
                             <div className="items_top_three">
                                {topThreeAndImg.map((item) => Boolean(item.lesson_type)&&(
                        <div className="item_lesson_type_persent">
                          
                                {item.lesson_type}: {item.per_cent}
                        


                        </div>

                      ))} 
                             </div>
                    
                        </div>
                  

                       </>
                
                     )}
                        {step === 1 && 
                        (  <button
                         onClick={this.handleSubmitFirst} 
                         className="butTest"
                         style={{
                            
                             opacity:  !(answersLenghtOnFirstStep -1 === totalReactPackages.length) ? 0.5 : 1,
                             pointerEvents:  answersLenghtOnFirstStep -1 === totalReactPackages.length ? "auto" : "none"
                         }}
                         >
                             Продолжить
                             </button>
                             )}



                        {step === 2 && (
                              <button 
                              onClick ={this.handleSubmitSecond}
                               className="butTest"
                               style={{
                            
                                opacity:  !(answersLenghtOnFirstStep  === resultArray.length) ? 0.5 : 1,
                                pointerEvents:  answersLenghtOnFirstStep  === resultArray.length ? "auto" : "none",
                                
                            }}
                               >
                                   Продолжить
                                   </button>
                                   )}



                        {step === 3 && (
                            <NavLink to="/information_page">
                                <button 
                             onClick={this.requestResult}
                              className="but"
                              >
                         Узнать о направлениях подготовки
                            </button> 
                            </NavLink>
                            
                            )  }
                        <div>


                        </div>
            </div>
        );
    }
}

export { RequestGetQuestionES}; 
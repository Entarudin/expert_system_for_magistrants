import React from 'react';
import qs from 'qs';
import '../App.css'
import {
    Redirect,
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



    render() {
        const { totalReactPackages,value, answers, resultArray , step, topThreeAndImg} = this.state;
        const userId = localStorage.getItem("id")
        const countOfQuestions = 15;
        return (
            <div className="card text-center m-3">
            <form onSubmit={this.handleSubmit} id = "myForm" >
                {Boolean(totalReactPackages.length) && totalReactPackages.map((item) => (
                                        <div key ={item.id}>
                                                    {item.text}
                                            <p>
                                                <input 
                                                    type="radio"
                                                    value="yes" 
                                                    name={item.id}
                                                    onChange={() => this.onChangeItem(item.id, 'yes')}
                                                />
                                                    да
                                            </p>
                                        
                                            <p><input type="radio" value="nope" name={item.id} onChange={() => this.onChangeItem(item.id, 'nope')}/>нет</p>

                                            <p> <input type="radio" value="mb_yes" name={item.id} onChange={() => this.onChangeItem(item.id, 'mb_yes')}/>скорее да</p>

                                            <p><input type="radio" value="mb_nope" name={item.id} onChange={() => this.onChangeItem(item.id, 'mb_nope')}/>скорее нет</p>
                                        </div>
                                    ))}

                {Boolean(resultArray.length) && (resultArray.map((item) =>(
    <div key ={item.id}>
                {item.text}
        <p>
            <input 
                type="radio"
                value="yes" 
                name={item.id}
                onChange={() => this.onChangeItem(item.id, 'yes')}
            />
                да
        </p>
    
        <p><input type="radio" value="nope" name={item.id} onChange={() => this.onChangeItem(item.id, 'nope')}/>нет</p>

        <p> <input type="radio" value="mb_yes" name={item.id} onChange={() => this.onChangeItem(item.id, 'mb_yes')}/>скорее да</p>

        <p><input type="radio" value="mb_nope" name={item.id} onChange={() => this.onChangeItem(item.id, 'mb_nope')}/>скорее нет</p>
    </div>
                )))}
                
                
                
                
                
                        <input type="hidden" value={countOfQuestions} name="required_count_of_questions"/>
                       
                </form>

                {Boolean(topThreeAndImg.length)&& (
                    <div>

                    <img src={"http://127.0.0.1:6969/api/get_img_by_id?img_id="+ this.state.id_img}  alt="logo" />
                    {topThreeAndImg.map((item) =>(
                        <div>
                            <p>
                                {item.lesson_type}
                            <p>{item.per_cent}</p>
                            </p>


                        </div>

                    ))}

                </div>
                
                )}
                {step === 1 && (  <button onClick={this.handleSubmitFirst}>Отправить 1 шаг</button>)}
                        {step === 2 && (  <button onClick ={this.handleSubmitSecond}>Отправить 2 шаг</button>)}
                        {step === 3 && (  <button onClick>Отправить 3 шаг</button>) }
                        <div>


                        </div>
            </div>
        );
    }
}

export { RequestGetQuestionES}; 
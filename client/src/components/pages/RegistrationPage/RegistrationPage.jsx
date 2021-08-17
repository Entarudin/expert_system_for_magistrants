import './RegistrationPage.css';
const RegistrationPage = () => {
    return (
        <div className="Main">
        <div className="pole">
            <p className="registration_title"> Регистрация</p>
            <input type="text" placeholder="ФИО" className="big_input"/>
            <input type="text" placeholder="Предыдущее учебное заведение" className="big_input"/>
            <input type="text" placeholder="Полученная специальность" className="big_input"/>
            <div className="smallInputGroup">
            <input type="text" placeholder="Дата рождения" className="small_input"/>
            <input type="text" placeholder="Номер телефона" className="small_input"/>
            </div>            
            <input type="text" placeholder="Электронная почта" className="big_input"/>
            <div className="smallInputGroup">
            <input type="password" placeholder="Пароль" className="small_input"/>
            <input type="password" placeholder="Повтрорите пароль" className="small_input"/>               
            </div>
            <button className="registration_button">
               Зарегистрироваться
            </button>
            </div>
    </div>
    );
  };
  
  export default RegistrationPage;
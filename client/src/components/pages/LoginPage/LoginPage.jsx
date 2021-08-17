import './LoginPage.css';
import { NavLink} from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="Main">
        <div className="pole">
                <p className="login_title"> Вход в систему </p>
                  <input type="text" placeholder="Электроная почта" className="loginInput"/>
                <input type="password" placeholder="Пароль" className="loginInput"/>
                <button className="login_button">Войти</button>
                {/* <div className="NavLinkLogin"> */}
                <NavLink to='/Registration'> <button className="login_button_reg">Зарегистрироваться</button></NavLink>
                {/* </div> */}
            </div>
    </div>
    );
  };
  
  export default LoginPage;
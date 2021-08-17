import './changePassword.css';
import { NavLink } from 'react-router-dom';
const ChangePassword = () => {
    return (
      <> 
      <p className="PasswordEditingTitle">Изменить пароль</p>
      <div className="UserEditingPassword"> 

            <input type="password" placeholder="Новый пароль" className="big_input_editing"/>
            <input type="password" placeholder="Повторите пароль" className="big_input_editing"/>
                
         
            <NavLink to='/userProfile'><button className="editing_button">
               Отменить
            </button></NavLink>
            <button className="editing_button">
               Сохранить
            </button>
            </div>

    </>
    );
  };
export default ChangePassword;
import './PersonalPage.css';
import {NavLink} from 'react-router-dom';
const PersonalPage = () => {
    return (
      <> 
      <div className="personalPage">   
      <div className="PersonalInformation">
      <p className="personalInfoTitle">Обо мне</p>
      <div className="personalInfo">
      <NavLink to='/UserEditing'><button className="edit">Редактировать</button></NavLink>
      <NavLink to='/PasswordEditing'><button className="change">Изменить пароль</button></NavLink>

      </div>
      </div>

      <div className="PersonalResults">
      <p className="personalResTitle">Мои результаты</p>
      <div className="personalRes">
      <NavLink to=''><button className="again">Пройти тестирование</button></NavLink>
          
      </div> 
      </div>
        </div> 

    </>
    );
  };
export default PersonalPage;
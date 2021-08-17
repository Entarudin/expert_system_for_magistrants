import './UserEditing.css';
import { NavLink } from 'react-router-dom';

const UserEditing = () => {
    return (
      <>
      <p className="UserEditingTitle">Редактирование профиля</p>
      <div className="UserEditing"> 
      <input type="text" placeholder="ФИО" className="big_input_editing"/>
            <div className="smallInputGroup">
            <input type="text" placeholder="Дата рождения" className="small_input_editing"/>
            <input type="text" placeholder="Номер телефона" className="small_input_editing"/>
            </div> 
            <input type="text" placeholder="Электронная почта" className="big_input_editing"/>  
            <input type="text" placeholder="Предыдущее учебное заведение" className="big_input_editing"/>
            <input type="text" placeholder="Полученная специальность" className="big_input_editing"/>
         
            
         
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
export default UserEditing;
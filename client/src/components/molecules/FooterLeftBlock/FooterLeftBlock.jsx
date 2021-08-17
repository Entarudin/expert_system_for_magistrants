import React from 'react';
import './FooterLeftBlock.css';

const FooterLeftBlock = () => {
  return (
          <>
         <div className="contact">
           <p className="title"> Контактная информация</p>
            <p className="listitem"> ул. Чехова, 2, ауд. И-201</p>
            <p className="listitem">г. Таганрог, 347922</p>
            <p className="listitem">Ростовская область, Россия</p>
            <p className="listitem">Телефон: 8 (8634) 360-450</p>
            <p className="listitem">E-Mail: info@ictis.sfedu.ru</p>

            <a href="https://vk.com/ictis_sfedu"><img className="messagers" src="icons/vk.png" /></a>
             <a  href="https://www.facebook.com/groups/ICTIS.SFedU/"><img className="messagers" src="icons/fb.png" /></a>
            <a  href="https://www.instagram.com/ictis_sfedu/"><img className="messagers" src="icons/inst.png"/></a>
        </div>
       
</>



);
};
export default FooterLeftBlock;
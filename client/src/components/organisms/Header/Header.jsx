import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
      <>
    <div class="header_img">
            <NavLink to="/"> <img src="/img/ictis.jpg" className="logo_ictis"/></NavLink>
            <img src="/img/head.png" className="blue_line"/>            
        </div>
        <div class="header_text">
            <a href="http://abit.ictis.sfedu.ru/master.html" className="for_abit">Для абитуриентов</a>
            <a href="http://ictis.sfedu.ru/" className="web_site">Официальный сайт ИКТИБ</a>
        </div>
        </>
);
};

export default Header;
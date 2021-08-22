import React from 'react';
import {NavLink} from 'react-router-dom';
import './Software.css';

const Software = () => {
  return (

        <div class="frame_5">
            <img src="img/n5_img.png" alt="" class="logo_pro_5"/>
            <div className="pro_name_5">
            <NavLink to='/information_page/SoftwarePage'>Информационное и программное обеспечение автоматизированных систем</NavLink>
        </div>
        
    </div>

  );
}

export default Software;

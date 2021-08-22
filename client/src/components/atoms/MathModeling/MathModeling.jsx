import React from 'react';
import {NavLink} from 'react-router-dom';
import './MathModeling.css';

const MathModeling = () => {
  return (

        <div class="frame_2">
            <img src="img/n2_img.png" alt="" class="logo_pro_2"/>
            <div className="pro_name_2">
            <NavLink to='/information_page/MathModelingPage'>Математическое моделирование в инженерных науках</NavLink>
        </div>
        
    </div>

  );
}

export default MathModeling;

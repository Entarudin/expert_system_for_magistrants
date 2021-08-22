import React from 'react';
import {NavLink} from 'react-router-dom';
import './ErgoDesign.css';

const ErgoDesign = () => {
  return (

        <div class="frame_8">
            <img src="img/n8_img.png" alt="" class="logo_pro_8"/>
            <div className="pro_name_8">
            <NavLink to='/information_page/ErgoDesignPage'>Эргодизайн пользовательского интерфейса</NavLink>
        </div>
        
    </div>

  );
}

export default ErgoDesign;

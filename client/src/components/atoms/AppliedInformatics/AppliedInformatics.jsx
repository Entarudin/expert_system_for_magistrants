import React from 'react';
import {NavLink} from 'react-router-dom';
import './AppliedInformatics.css';

const AppliedInformatics = () => {
  return (

        <div class="frame_1">
            <img src="img/n1_img.png" alt="" class="logo_pro_1"/>
            <div className="pro_name_1">
            <NavLink to='/information_page/AppliedInformaticsPage'>Прикладная информатика для высокопроизводительных вычислительных систем</NavLink>
        </div>
        
    </div>

  );
}

export default AppliedInformatics;

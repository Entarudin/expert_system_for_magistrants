import React from 'react';
import FooterLeftBlock from '../../molecules/FooterLeftBlock/FooterLeftBlock';
import FooterRightBlock from '../../molecules/FooterRightBlock/FooterRightBlock';
import './Footer.css';

const Footer = () => {
  return (
    <div className="back_position">           
    <FooterLeftBlock/> 
    <FooterRightBlock/>       
    </div>
    );
};
export default Footer;
import React from 'react';
import InformationalAnalyticalSystems from '../../atoms/InformationalAnalyticalSystems/InformationalAnalyticalSystems';
import ErgoDesign from '../../atoms/ErgoDesign/ErgoDesign';
import AutomatedSystems from '../../atoms/AutomatedSystems/AutomatedSystems';
import './ThirdInfoLine.css';
const ThirdInfoLine = () => {
  return (
      <>
      <div className="thirdLine">
    <InformationalAnalyticalSystems/>
    <ErgoDesign/>
    <AutomatedSystems/>
    </div>
    </>
  );
}

export default ThirdInfoLine;

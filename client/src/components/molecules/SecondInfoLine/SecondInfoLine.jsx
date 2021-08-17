import React from 'react';
import IntelligentSystems from '../../atoms/IntelligentSystems/IntelligentSystems';
import Software from '../../atoms/Software/Software';
import SystemIntegration from '../../atoms/SystemIntegration/SystemIntegration';
import './SecondInfoLine.css';

const SecondInfoLine = () => {
  return (
      <>
     <div className="secondLine"> 
    <IntelligentSystems/>
    <Software/>
    <SystemIntegration/>
    </div>
    </>
  );
}

export default SecondInfoLine;

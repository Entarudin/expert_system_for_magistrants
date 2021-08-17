import React from 'react';
import AppliedInformatics from '../../atoms/AppliedInformatics/AppliedInformatics';
import MathModeling from '../../atoms/MathModeling/MathModeling';
import HighPerformanceSystems from '../../atoms/HighPerformanceSystems/HighPerformanceSystems';
import './FirstInfoLine.css';
const FirstInfoLine = () => {
  return (
    <>
      <div className='line'>
    <AppliedInformatics />
    <MathModeling />
    <HighPerformanceSystems />
    </div>
    </>
  );
}

export default FirstInfoLine;

import React from 'react';
import CoreButton from './core-button';

const OperatorButton = ({ onClick, value }) => {
  const cls = "operator";
  return (
    <CoreButton onClick={ onClick } cls={cls} value={value} />
  )
}

export default OperatorButton;
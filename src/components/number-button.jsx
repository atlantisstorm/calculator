import React from 'react';
import CoreButton from './core-button';

const NumberButton = ({ onClick, value }) => {
  const cls = value !== "=" ? "number" : "equals";
  return (
    <CoreButton onClick={ onClick } cls={cls} value={value} />
  )
}

export default NumberButton;
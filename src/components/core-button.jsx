import React from 'react';

const CoreButton = ({ onClick, value, cls }) => {
  const testid = `core-button-${value}`;
  let text;
  switch (value) {
    case "back":{
      text = "<back>"
      break;
    }
    case "clear": {
      text = "Clear";
      break;
    }
    default: {
      text = value;
    }
  }
  return (
    <button data-testid={ testid } onClick={ onClick } className={cls} value={value}>{text}</button>
  )
}

export default CoreButton;
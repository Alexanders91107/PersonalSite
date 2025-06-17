import React from 'react'; 
import './css/Button.css';

function Button({ onButtonClick, buttonText = "Click Me" }) {
  return (
    <button className="button" onClick={onButtonClick}>
      {buttonText}
    </button>
  );
}

export default Button;
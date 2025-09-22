import React from 'react'; 
import './css/Button.css';

function Button({ clickFunction, contentType = "default", logo = null }) {
  return (
    <button className="button" onClick={() => clickFunction(contentType)}>
        <img src={logo} alt="" className="button-logo" />
    </button>
  );
}

export default Button;
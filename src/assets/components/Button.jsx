import React from 'react'; 
import './css/Button.css';

function Button({ clickFunction, contentType = "default" }) {
  return (
    <button className="button" onClick={() => clickFunction(contentType)}>
      {contentType}
    </button>
  );
}

export default Button;
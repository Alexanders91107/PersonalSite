import React from 'react'; 
import './css/Button.css';

function Button({ openFunction, closeFunction, buttonText = "Click Me" }) {
  const [toggleWindow, setToggle] = React.useState(false);

  const handleClick = () => {
    if(!toggleWindow) openFunction();
    else closeFunction();
    setToggle(!toggleWindow);
  }

  return (
    <button className="button" onClick={handleClick}>
      {buttonText}
    </button>
  );
}

export default Button;
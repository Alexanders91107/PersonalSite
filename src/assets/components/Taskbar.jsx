import React from 'react'; 
import Button from './Button.jsx';
import './css/Taskbar.css';

function Taskbar({buttonFunction}) {
  return (
    <div className="taskbar">
        <div className = "buttons-container">
            <Button onButtonClick={buttonFunction} buttonText={"Click Me"} />
            <Button onButtonClick={buttonFunction} buttonText={"Click Me"} />
            <Button onButtonClick={buttonFunction} buttonText={"Click Me"} />
        </div>

        <div className = "time-date-container">
            <div className="time">12:00 PM</div>
            <div className="date">January 1, 2023</div>
        </div>
    </div>
  );
}

export default Taskbar;
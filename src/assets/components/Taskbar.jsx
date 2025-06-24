import React, { useState, useEffect } from 'react';
import Button from './Button.jsx';
import './css/Taskbar.css';

function Taskbar({openFunction, closeFunction}) {
    const [currentDate, setCurrentDate] = useState(new Date());
    
    //updates with a new date every second
    useEffect(() => {
        // Set up an interval to update the time every second
        const timerId = setInterval(() => {setCurrentDate(new Date());}, 1000);
        return () => clearInterval(timerId); //removes interval when component is removed
    }, []); // The empty array ensures this effect runs only once on initial render

  return (
    <div className="taskbar">
        <div className = "buttons-container">
            <Button openFunction={openFunction("about")} closeFunction = {closeFunction("about")} buttonText={"about"} />
            <Button openFunction={openFunction("projects")} closeFunction={closeFunction("projects")} buttonText={"projects"} />
            <Button openFunction={openFunction("posts")} closeFunction={closeFunction("posts")} buttonText={"posts"} />
            <Button openFunction={openFunction("game")} closeFunction={closeFunction("game")} buttonText={"game"} />
        </div>

        <div className = "time-date-container">
            {/* Format the date to display time and date strings */}

            {/* empty array in the timeString tells it to change format on browser default */}
            <div className="time">{currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
            <div className="date">{currentDate.toLocaleDateString()}</div>
        </div>
    </div>
  );
}

export default Taskbar;
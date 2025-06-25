import React, { useState, useEffect } from 'react';
import './css/Taskbar.css';

function TaskbarGrabber({hoverFunction, taskbarVisible}) {
  return (
    <div 
        className = "taskbar-grabber"
        style={{ pointerEvents: taskbarVisible ? "none" : "auto" }}
        onMouseEnter={() => hoverFunction(true)}
    >

    </div>
  );
}

export default TaskbarGrabber;
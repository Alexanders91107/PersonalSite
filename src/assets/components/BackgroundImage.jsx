import React from 'react'; 
import './css/BackgroundImage.css';
import MyHead from './images/MyHead.png';

function BackgroundImage() {
  return (
    <div className = "background-image">
        <img src={MyHead} alt="My Head" className="head-image"/>
        <div className = "circle"></div>
    </div>
  );
}

export default BackgroundImage;
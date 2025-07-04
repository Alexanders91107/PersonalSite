import { useState, useEffect } from 'react';
import './css/BackgroundImage.css';
import MyHead from './images/MyHead.png';

function BackgroundImage() {
  //-------------------------------------------------------------------------------------
  //Code for handling the rectangle selector
  //-------------------------------------------------------------------------------------

  //variables to handle the rectangle selector
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  //initial click handler
  const handleClick = (e) => {
    setIsDragging(true);
    console.log("background clicked");
    setStartPos({ x: e.clientX, y: e.clientY });
  }

  //use effect for when the mouse is being dragged (when the handleClick is called)
  useEffect(() => {
    //runs on mouse movement
    const handleMouseMove = (e) => {
      //calculate the position
      const x = Math.min(startPos.x, e.clientX);
      const y = Math.min(startPos.y, e.clientY);

      //set the position
      rect.style.left = `${x}px`;
      rect.style.top = `${y}px`;

      //calcualte the size
      const width = Math.abs(e.clientX - startPos.x);
      const height = Math.abs(e.clientY - startPos.y);

      //set the size
      rect.style.width = `${width}px`;
      rect.style.height = `${height}px`;

      //show the rectangle
      rect.style.display = 'block';
    }

    //runs on mouse up, sets isDragging to false
    const handleMouseUp = () => {setIsDragging(false);}

    //is isDragging is false, do nothing
    if(!isDragging) return;

    //code to create the rectangle
    const rect = document.getElementById('drag-rectangle');
    rect.id = 'drag-rectangle';
    rect.style.position = 'fixed';
    rect.style.background = 'rgba(0, 0, 0, 0.2)';
    rect.style.backgroundImage = 'linear-gradient(135deg,rgba(0, 0, 0, 0.1) 0%,rgba(0, 0, 0, 0.4) 100%)';
    rect.style.borderRadius = '10px';
    rect.style.pointerEvents = 'none';
    document.body.appendChild(rect);

    //event listeners for mouse movement and mouse up
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    //cleanup function to remove event listeners and hide the rectangle
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      rect.style.display = 'none';
    };
  }, [isDragging]);
  //-------------------------------------------------------------------------------------

  return (
    <div className = "background-image"
      onMouseDown = {handleClick}
    >   
        <div id="drag-rectangle" style={{ position: 'fixed', zIndex: 1000 }}></div>
        <img src={MyHead} alt="My Head" className="head-image"/>
        <div className = "circle"></div>
    </div>
  );
}

export default BackgroundImage;
import { useState, useEffect } from 'react';
import './css/BackgroundImage.css';
import MyHead from './images/MyHead.png';

function BackgroundImage() {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    setIsDragging(true);
    console.log("background clicked");
    setStartPos({ x: e.clientX, y: e.clientY });
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCurrentPos({ x: e.clientX, y: e.clientY });

      //calculate the position
      const x = Math.min(startPos.x, e.clientX);
      const y = Math.min(startPos.y, e.clientY);

      rect.style.left = `${x}px`;
      rect.style.top = `${y}px`;

      //calcualte the size
      const width = Math.abs(e.clientX - startPos.x);
      const height = Math.abs(e.clientY - startPos.y);

      rect.style.width = `${width}px`;
      rect.style.height = `${height}px`;
      rect.style.display = 'block';
    }

    const handleMouseUp = () => {
      setIsDragging(false);
      return;
    }

    if(!isDragging) return;

    const rect = document.getElementById('drag-rectangle');
    rect.id = 'drag-rectangle';
    rect.style.position = 'fixed';
    rect.style.backgroundImage = 'linear-gradient(135deg,rgba(0, 0, 0, 0.1) 0%,rgba(0, 0, 0, 0.4) 100%)';
    rect.style.borderRadius = '5px';
    rect.style.pointerEvents = 'none';
    document.body.appendChild(rect);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setIsDragging(false);
      rect.style.display = 'none';
    };
  }, [isDragging]);

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
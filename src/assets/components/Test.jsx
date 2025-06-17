import React, { useState , useRef, useEffect } from 'react';
import './css/Test.css';

function Test() {
    const [color, setColor] = useState("red");
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ top: undefined, left: undefined });
    const windowRef = useRef(null);

    const handleClick = (e) => {
        if(color === "red") setColor("blue");
        else setColor("red");
        
        if(windowRef.current) { //if the windowRef is not null (the window ref is the div this function is called on)
            setIsDragging(true); //sets dragging variable to true

            const rect = e.target.getBoundingClientRect(); //uses this object to get information about the div
            setOffset({ //calculates the initial offsets based on mouse position (e.client)
                x: e.clientX - rect.left, 
                y: e.clientY - rect.top,
            });

            e.preventDefault(); // Prevent text selection
        }
    };

    useEffect(() => { //runs whenever isDragging changes (only does anything if its true)
        const handleMouseUp = () => {setIsDragging(false);}; //sets dragging variable to false

        const handleMouseMove = (e) => { //runs whenever the mouse moves
            if (!isDragging || !windowRef.current) return;
            
            //calculates the position based on the new mouse position and the initial offset

            //for calcualting bounds
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            //for calculating the upper bounds (lowest you can go on screen is screenHeight - divHeight pixels)
            const elemRect = windowRef.current.getBoundingClientRect();
            const elemWidth = elemRect.width;
            const elemHeight = elemRect.height;

            let newTop = Math.max(0, Math.min(e.clientY - offset.y, windowHeight - elemHeight));
            let newLeft = Math.max(0, Math.min(e.clientX - offset.x, windowWidth - elemWidth));
            setPosition({ top: newTop, left: newLeft });
        }

        if(isDragging){ //if is dragging, adds listeners for when the mouse moves and when the mouse is released
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        //when the mouse is released, remove the event listeners
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    //sets the style of the div on every render
    const testStyle = {};
    testStyle.backgroundColor = color;
    testStyle.top = `${position.top}px`;
    testStyle.left = `${position.left}px`;
    testStyle.transform = 'none'; // Override CSS centering transform
    console.log("hello");

    return(
        <div 
            className = "test"
            onMouseDown = {handleClick}
            ref= {windowRef} //sets the ref to the div to access information about it
            style = {testStyle}
        >
        </div>
    );
}

export default Test;
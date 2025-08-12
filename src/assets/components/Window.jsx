import React, { useState , useRef, useEffect } from 'react';
import Content from './Content.jsx';
import './css/Window.css';

function Window({ windowTitle = "My Application", toggleTaskbar, onClose, onAccess, contentType = "default", style }) {
    //------------------------------------------------------------------------------------
    //Variables and states
    //------------------------------------------------------------------------------------

    // State for dragging
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ top: window.innerHeight/4, left: window.innerWidth/4});
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef(null);

    // State for resizing
    const [isDraggingResize, setIsDraggingResize] = useState(false);
    const [activeResizeDirection, setActiveResizeDirection] = useState(null);
    const [resizeMousePos, setResizeMousePos] = useState({ x: 0, y: 0 });
    const [resizeInitialSize, setResizeInitialSize] = useState({ width: 0, height: 0 });
    const [resizeInitialPosition, setResizeInitialPosition] = useState({ top: 0, left: 0 });
    const [size, setSize] = useState({ width: window.innerWidth/2, height: window.innerHeight/2});

    // State for fullscreen mode
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [savedSize, setSavedSize] = useState({ width: window.innerWidth/2, height: window.innerHeight/2 });
    const [savedPosition, setSavedPosition] = useState({ top: window.innerHeight/4, left: window.innerWidth/4 });

    // Minimum size for the window
    const minWidth = 450;
    const minHeight = 100;

    // To prevent sticking to the very edge
    const viewportGutter = 5;
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------
    //Code for handling app.js functions
    //------------------------------------------------------------------------------------

    const handleAccess = (e, isButton = false) =>{
        if(!isButton && e.target.closest('button')) return; // Prevent bringing to front when clicking buttons
        if(isFullscreen) toggleTaskbar(false);
        onAccess(); // Call handleAccess to bring the window to the front
    }

    const handleClose = () => {
        if(isFullscreen) toggleTaskbar(true); // Show taskbar when closing fullscreen
        onClose();
    }
    //------------------------------------------------------------------------------------


    //------------------------------------------------------------------------------------
    //Code for dragging the window
    //------------------------------------------------------------------------------------

    //---
    // handles when the user clicks the window header
    const handleHeaderClick = (e) => {
        if(e.target.closest('button')) return; // Prevent dragging when clicking buttons
        handleAccess(e); // Call handleAccess to bring the window to the front

        if(windowRef.current) {
            setIsDragging(true); //sets dragging variable to true

            const rect = windowRef.current.getBoundingClientRect(); //gets the position of the window
            setOffset({ //calculates offsets based on mouse position (e.client)
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });

            e.preventDefault(); // Prevent text selection
        }
    };
    //---

    //---
    //useEffect for moving window
    useEffect(() => {
        const handleMouseUp = () => {setIsDragging(false);}; //sets dragging variable to false when mouse is released

        //handles the moving of the window
        //this function is called when the mouse moves while dragging
        const handleMouseMove = (e) => {
            if (!isDragging || !windowRef.current) return;
            //calculates the position based on the new mouse position and the initial offset

            //for calcualting bounds
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            //for calculating the upper bounds (lowest you can go on screen is screenHeight - divHeight pixels)
            const elemRect = windowRef.current.getBoundingClientRect();
            const elemWidth = elemRect.width;
            const elemHeight = elemRect.height;

            //calculates the new position based on the mouse position and initial mouse offset from the top left corner of the window
            let newTop = Math.max(viewportGutter, Math.min(e.clientY - offset.y, windowHeight - elemHeight - viewportGutter));
            let newLeft = Math.max(viewportGutter, Math.min(e.clientX - offset.x, windowWidth - elemWidth - viewportGutter));

            //set the new position
            setPosition({ left: newLeft, top: newTop});
        };

        // Add event listeners for mouse move and mouse up
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none'; // Optional: improve drag experience
        } else {
            document.body.style.userSelect = '';
        }

        //removes event listeners
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
        };
    }, [isDragging, offset]); //dependencies for useEffect, calls function when these values change
    //---
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------



    //------------------------------------------------------------------------------------
    //Code for window resizing
    //------------------------------------------------------------------------------------

    ///---
    //This is used to create the resize handlers for each edge of the window
    const createResizeHandler = (direction) => (e) => {
        if(e.target.closest('button')) return;

        if(windowRef.current) {
            handleAccess(e); // Call handleAccess to bring the window to the front
            setIsDraggingResize(true);
            setActiveResizeDirection(direction); // Store the active direction

            const rect = windowRef.current.getBoundingClientRect(); //gets window info

            // Store the initial size of the window
            // This is used to calculate the new size when resizing
            setResizeInitialSize({
                height: rect.height,
                width: rect.width,
            });

            // Store the window's current top/left position from state
            setResizeInitialPosition({ 
                top: position.top, 
                left: position.left 
            });

            // Always store the initial X and Y of the mouse click
            setResizeMousePos({ x: e.clientX, y: e.clientY });
            
            //prevents text selection
            e.preventDefault();
        }
    };
    ///---

    ///---
    // This function is called when the user clicks on any of the resize handles
    useEffect(() => {
        //when mouse is released, stoo dragging
        const handleMouseUp = () => {
            setIsDraggingResize(false); // sets dragging variable to false
            setActiveResizeDirection(null); // Reset direction          
        };

        //main function that handles the resizing of the window
        //this function is called when the mouse moves while resizing
        const handleMouseMove = (e) => {
            if (!isDraggingResize || !windowRef.current || !activeResizeDirection) return;

            //variables for new size and position
            let newWidth = resizeInitialSize.width;
            let newHeight = resizeInitialSize.height;
            let newTop = resizeInitialPosition.top;
            let newLeft = resizeInitialPosition.left;

            //calculates the difference in mouse position from the initial click
            let deltaX = e.clientX - resizeMousePos.x; //will be negative if moving left
            let deltaY = e.clientY - resizeMousePos.y; //will be negative if moving up

            //if the mouse moves outside the viewport, prevent resizing
            if(e.clientX < viewportGutter) deltaX = viewportGutter - resizeMousePos.x; // Prevent resizing when mouse is outside viewport
            if(e.clientY < viewportGutter) deltaY = viewportGutter - resizeMousePos.y; // Prevent resizing when mouse is outside viewport
            
            // Exit fullscreen mode if resizing
            if(isFullscreen) setIsFullscreen(false);

            //-
            //Caluclates new positions and sizes

            // Adjust width and left position
            if (activeResizeDirection.includes('left')) {
                newWidth = resizeInitialSize.width - deltaX; //increase width
                newLeft = resizeInitialPosition.left + deltaX; //move left edge to mouse position
            } 
            else if (activeResizeDirection.includes('right')){
                newWidth = resizeInitialSize.width + deltaX; //increase width
            }
            
            // Adjust height and top position
            if (activeResizeDirection.includes('top')) {
                newHeight = resizeInitialSize.height - deltaY; //increase height
                newTop = resizeInitialPosition.top + deltaY; //move top edge to mouse position
            } else if (activeResizeDirection.includes('bottom')) {
                newHeight = resizeInitialSize.height + deltaY; //increase height
            }

            // Apply min width and adjust position if resizing from left
            if (newWidth < minWidth) {
                if (activeResizeDirection.includes('left')) newLeft += newWidth - minWidth;
                newWidth = minWidth;
            }

            // Apply min height and adjust position if resizing from top
            if (newHeight < minHeight) {
                if (activeResizeDirection.includes('top')) newTop += newHeight - minHeight;
                newHeight = minHeight;
            }

            //-

            //-
            // Boundary checks (ensure window stays within viewport)

            // Left boundary
            if (newLeft < 0) {
                if (!activeResizeDirection.includes('left')) { // If not dragging left edge, width shrinks
                    newWidth += newLeft; // newLeft is negative
                }
                newLeft = 0;
            }
            // Top boundary
            if (newTop < 0) {
                if (!activeResizeDirection.includes('top')) { // If not dragging top edge, height shrinks
                    newHeight += newTop; // newTop is negative
                }
                newTop = 0;
            }
            // Right boundary
            if (newLeft + newWidth > window.innerWidth - viewportGutter) {
                if (activeResizeDirection.includes('left')) { // If dragging left edge, adjust left
                    newLeft = window.innerWidth - viewportGutter - newWidth;
                } else { // Else, adjust width
                    newWidth = window.innerWidth - viewportGutter - newLeft;
                }
            }
            // Bottom boundary
            if (newTop + newHeight > window.innerHeight - viewportGutter) {
                if (activeResizeDirection.includes('top')) { // If dragging top edge, adjust top
                    newTop = window.innerHeight - viewportGutter - newHeight;
                } else { // Else, adjust height
                    newHeight = window.innerHeight - viewportGutter - newTop;
                }
            }

            //-

            //sets new position and size
            newWidth = Math.max(minWidth, newWidth);
            newHeight = Math.max(minHeight, newHeight);
            newLeft = Math.max(viewportGutter, newLeft);
            newTop = Math.max(viewportGutter, newTop);

            setSize({ width: newWidth, height: newHeight });
            setPosition({ top: newTop, left: newLeft });
        };

        // Add event listeners for mouse move and mouse up
        if(isDraggingResize){
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        // Remove event listeners when done
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [isDraggingResize]); //dependencies for useEffect, calls function when these values change
    ///---

    //---
    //handles a click on the fullscreen button

    const handleFullscreen = (e) =>{
        if (windowRef.current) {
            handleAccess(e, true); // Call handleAccess to bring the window to the front

            //if already fullscreen, restore saved size
            if (isFullscreen){
                setSize(savedSize);
                setPosition(savedPosition);
                toggleTaskbar(true); // Show taskbar when exiting fullscreen
            }
            else { //if not fullscreen, make fullscreen.
                //save current position
                setSavedSize({ width: size.width, height: size.height });
                setSavedPosition({ top: position.top, left: position.left });
                
                //set new, fullscreen, position
                setSize({ width: window.innerWidth - viewportGutter*2, height: window.innerHeight - viewportGutter*2});
                setPosition({ top: viewportGutter, left: viewportGutter });

                toggleTaskbar(false); // Hide taskbar when entering fullscreen
            }

            setIsFullscreen(!isFullscreen); // Toggle fullscreen state
        }
    }
    //---

    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------



    //------------------------------------------------------------------------------------
    //Code for handling screen resizing
    //------------------------------------------------------------------------------------

    // Track window size in state
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    //runs every render, checks if the screen size has changed
    //and updates the screenSize state accordingly
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    //runs whenever the screen size changes, or the size or position of the window changes
    //keeps the window in bounds of the screen 
    useEffect(() => {
        console.log('Window size changed:', screenSize);

        if(position.left < 0) setPosition({top: position.top, left: viewportGutter}); // Reset to left edge
        if(position.top < 0) setPosition({top: viewportGutter, left: position.left}); // Reset to top edge

        if(position.left + size.width > screenSize.width) {
            let newWidth = screenSize.width - position.left - viewportGutter; // 5px for gutter
            if (newWidth < minWidth) {
                newWidth = minWidth; // Ensure minimum width
                position.left = screenSize.width - minWidth - viewportGutter; // Reset to left edge if too small
            }
            setSize({height: size.height, width: newWidth}); // 5px for gutter
            setPosition({top: position.top, left: position.left}); // Keep position the same
        }

        if(position.top + size.height > screenSize.height) {
            let newHeight = screenSize.height - position.top - viewportGutter; // 5px for gutter
            if (newHeight < minHeight) {
                newHeight = minHeight; // Ensure minimum width
                position.top = screenSize.height - minHeight - viewportGutter; // Reset to left edge if too small
            }
            setSize({height: newHeight, width: size.width}); // 5px for gutter
            setPosition({top: position.top, left: position.left}); // Keep position the same
        }

        if(screenSize.height < minHeight + viewportGutter*2) {
            setPosition({top: viewportGutter, left: position.left}); // Reset to top edge if too small
            setSize({height: minHeight, width: size.width}); // Reset height to minimum
        }

        if(screenSize.width < minWidth + viewportGutter*2) {
            setPosition({top: position.top, left: viewportGutter}); // Reset to top edge if too small
            setSize({height: size.height, width: minWidth}); // Reset height to minimum
        }
    }, [screenSize, size, position]);


    //if window in fullscreen when the computer window is resized, maintain the fullscreen state and set position and size equal to screen size
    useEffect(() => {
        if(isFullscreen){
            setPosition({top: viewportGutter, left: viewportGutter}); // Reset to top edge
            setSize({height: screenSize.height - viewportGutter*2, width: screenSize.width - viewportGutter*2}); // Reset height to minimum
            return; // Skip further checks if in fullscreen mode
        }
    }, [screenSize]);
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------



    //------------------------------------------------------------------------------------
    //set the style for window based on new position and size (this will run every render)
    //------------------------------------------------------------------------------------

    //---
    const windowStyle = {...style,};

    //position
    windowStyle.top = `${position.top}px`;
    windowStyle.left = `${position.left}px`;
    windowStyle.transform = 'none'; // Override CSS centering transform

    //size
    windowStyle.height = `${size.height}px`;
    windowStyle.width = `${size.width}px`;
    //---


    //---
    // Resize edges for the window
    const resizeEdges = [
        'resize-right',
        'resize-left',
        'resize-top',
        'resize-bottom',
        'resize-top-left',
        'resize-top-right',
        'resize-bottom-left',
        'resize-bottom-right'
    ];
    //---
    //------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------

    //return window component
    return (
        <div 
            className="window"
            ref={windowRef}
            style={windowStyle} // runs on ever render, updates position of window
        >

            {/* 
            Code for the window Header ---
            */}
            <div 
                className="window-header"
                onMouseDown = {handleHeaderClick}
                style = {{cursor : isDragging ? 'grabbing' : 'grab'}}
            >
                <div className="window-title">{windowTitle}</div>
                <div className="window-controls">

                    {/*Maximize button*/}
                    <div className="maximize-button">
                        <button 
                            className = "window-button maximize"
                            onMouseDown = {handleFullscreen}
                        >O</button>
                    </div>

                    {/*Close Button*/}
                    <div className="close-button">
                        <button className = "window-button close"
                            onMouseDown = {handleClose}
                        >X</button>
                    </div>

                </div>
            </div>
            
            {/*Window Content*/}
            <div 
                className="window-content"
                onMouseDown = {handleAccess}
            >    
                <Content contentType = {contentType}/>
            </div>
            
            {/*Resize Handlers*/}
            {resizeEdges.map((edge) => (
                <div
                    key={edge}
                    className={`resize ${edge}`}
                    onMouseDown={createResizeHandler(edge)}
                ></div>
            ))}
        </div>
    );
}

export default Window;
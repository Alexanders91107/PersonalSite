import { useState, useEffect } from 'react';
import Taskbar from './assets/components/Taskbar.jsx';
import TaskbarGrabber from './assets/components/TaskbarGrabber.jsx';
import Window from './assets/components/Window.jsx';
import BackgroundImage from './assets/components/BackgroundImage.jsx';
import './App.css';

function App() {
  
  //------------------------------------------------------------------------------------
  //Window Management

  //When looking through this, keep in mind the windows are rendered through a mapping of
  //the 'windows' array
  //------------------------------------------------------------------------------------

  // State to manage the list of windows
  // Each window will have a unique ID to manage its state
  const [windows, setWindows] = useState([]);
  const [windowsZ, setWindowsZ] = useState([]);
  const [taskbarVisible, setTaskbarVisible] = useState(true);
  const [taskbarGrabberVisible, setTaskbarGrabberVisible] = useState(false);
  const [shouldRenderTaskbar, setShouldRenderTaskbar] = useState(true);
  const [taskbarOpacity, setTaskbarOpacity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  //------------------------------------------------------------------------------------
  //taskbar related functions
  //------------------------------------------------------------------------------------

  //useEffect to handle the taskbar opacity animation
  useEffect(() => {
    if(taskbarGrabberVisible || taskbarVisible){
      // If the taskbar grabber is visible or the taskbar is visible, show the taskbar
      setShouldRenderTaskbar(true);
      setTimeout(() => setTaskbarOpacity(1), 50);
    }
    else{
      // If neither is visible, hide the taskbar
      setTaskbarOpacity(0);
      const timeout = setTimeout(() => setShouldRenderTaskbar(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [taskbarGrabberVisible, taskbarVisible]);

  //function to handle taskbar grabber hover
  const handleTaskbarGrabber = (isHovering) => {setTaskbarGrabberVisible(isHovering);}

  //function to toggle the taskbar visibility
  const toggleTaskbar = (visible) => {setTaskbarVisible(visible);}

  //function to handle taskbar button clicks
  const handleButtonClick = (content) => {
    const existingWindow = windows.find(window => window.id === content);

    if(!existingWindow) addWindow(content)();
    else{
      // If the window is already open, toggle its isOpen state
      if(!taskbarVisible) toggleTaskbar(true);
      setWindows(prevWindows => 
        prevWindows.map(window => 
          window.id === content ? { ...window, isOpen: !existingWindow.isOpen } : window
        )
      );
    }
    accessHandler(content)();
  }
  //------------------------------------------------------------------------------------


  //------------------------------------------------------------------------------------
  // Functions for adding and removing windows
  //------------------------------------------------------------------------------------

  //when a button is clicked to add a new window
  const addWindow = (content) => () =>{
    // Give each window a unique ID
    const newWindow = { id: content, contentType: content, isOpen: true };

    //add window to the list
    setWindows(prevWindows => [...prevWindows, newWindow]);
    setWindowsZ(prevWindowsZ => [...prevWindowsZ, newWindow.id]);
  };

  const closeWindow = (key) => () => {
    // Filter out the window with the given ID
    const newWindows = windows.filter(window => window.id != key);
    const newWindowsZ = windowsZ.filter(id => id != key);

    setWindows(newWindows);
    setWindowsZ(newWindowsZ);
  };
  //------------------------------------------------------------------------------------


  //------------------------------------------------------------------------------------
  //this is for z-index management
  //windows are ordered by their index in the array
  //------------------------------------------------------------------------------------
  const accessHandler = (key) => () => {
    let newWindows = windowsZ.filter(id => id != key);
    newWindows.push(key);
    setWindowsZ(newWindows);
  };

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------
  useEffect(() => {
    const hideLoader = () => setTimeout(() => setIsLoading(false), 300); // small delay for smoothness
    if (document.readyState === 'complete') hideLoader();
    else window.addEventListener('load', hideLoader);
    return () => window.removeEventListener('load', hideLoader);
  }, []);

  const randomTexts = [
    "Loading",
    "Welcome",
    "Running SpillyOS",
    "Booting up",
    "Locking In",
    "hello",
    "Starting",
    "Preparing",
    "Getting things ready",
    "Just a moment",
    "Good things take time",
    "Reticulating splines",
    "Summoning pixels",
    "Aligning bits",
  ];

  const [randomText] = useState(() => {
    const idx = Math.floor(Math.random() * randomTexts.length);
    return randomTexts[idx];
  });

  //Render the app
  return (
    <>
      <div className="App">
        <div className = "loading-screen"
          style={{ opacity: isLoading ? 1 : 0 }}>
          <div className = "loading-text">{randomText}...</div>
        </div>
        <BackgroundImage className="background"/>

        {/* Map over the windows array and render a Window component for each */}
        {windows.map(window => (
          <Window 
            key={window.id} 
            windowTitle ={window.id}
            toggleTaskbar={toggleTaskbar}
            onClose={closeWindow(window.id)}
            onAccess = {accessHandler(window.id)}
            contentType = {window.contentType || 'default'}
            style={{ zIndex: windowsZ.indexOf(window.id), display: (window.isOpen) ? 'block' : 'none' }}
          />
        ))}

        {/* Taskbar with button to add new windows */}
        <div className="taskbar-container">
          <Taskbar 
            clickFunction={handleButtonClick}
            hoverFunction = {handleTaskbarGrabber}
            style={{display: (shouldRenderTaskbar) ? 'flex' : 'none', opacity: taskbarOpacity, transition: 'opacity 0.4s ease'}}
          />
        </div>

        <div>
          <TaskbarGrabber 
            hoverFunction={handleTaskbarGrabber}
            taskbarVisible={taskbarVisible}
          />
        </div>
      </div>
    </>
  );
}

export default App;

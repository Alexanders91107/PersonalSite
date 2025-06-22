import { useState } from 'react';
import Taskbar from './assets/components/Taskbar.jsx';
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

  //when a button is clicked to add a new window
  const addWindow = (content) => () =>{
    // Give each window a unique ID
    const newWindow = { id: Date.now(), contentType: content };

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
  
  //this is for z-index management
  //windows are ordered by their index in the array
  const accessHander = (key) => () => {
    let newWindows = windowsZ.filter(id => id != key);
    newWindows.push(key);
    setWindowsZ(newWindows);
  };

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------

  //Render the app
  return (
    <>
      <div className="App">
        <BackgroundImage className="background"/>

        {/* Map over the windows array and render a Window component for each */}
        {windows.map(window => (
          <Window 
            key={window.id} 
            windowTitle ={window.id}
            onClose={closeWindow(window.id)}
            onAccess = {accessHander(window.id)}
            contentType = {window.contentType || 'default'}
            style={{ zIndex: 100 + (windowsZ.indexOf(window.id)) }}
          />
        ))}

        {/* Taskbar with button to add new windows */}
        <div className="taskbar-container">
          <Taskbar buttonFunction={addWindow}/>
        </div>
      </div>
    </>
  );
}

export default App;

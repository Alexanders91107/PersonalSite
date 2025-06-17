import { useState } from 'react'
import Button from './assets/components/Button.jsx'
import Window from './assets/components/Window.jsx'
import './App.css'

function App() {
  
  //------------------------------------------------------------------------------------
  //Window Management

  //When looking through this, keep in mind the windows are rendered through a mapping of
  //the 'windows' array
  //------------------------------------------------------------------------------------

  // State to manage the list of windows
  // Each window will have a unique ID to manage its state
  const [windows, setWindows] = useState([]);

  //when a button is clicked to add a new window
  const addWindow = () => {
    // Give each window a unique ID
    const newWindow = { id: Date.now() };

    //add window to the list
    setWindows(prevWindows => [...prevWindows, newWindow]);
  };

  const closeWindow = (key) => () => {
    // Filter out the window with the given ID
    const newWindows = windows.filter(window => window.id != key);
    setWindows(newWindows);
  };
  
  //this is for z-index management
  //windows are ordered by their index in the array
  const accessHander = (key) => () => {
    //when a window is accessed, push to end of array
    let newWindows = windows.filter(window => window.id != key);
    newWindows.push({ id: key });
    setWindows(newWindows);
  };

  //------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------

  //Render the app
  return (
    <>
      <div className="App">
        <Button onButtonClick={addWindow} buttonText="Open window" />

        {/* Map over the windows array and render a Window component for each */}
        {windows.map(window => (
          <Window 
            key={window.id} 
            windowTitle ={`Window ${window.id}`}
            onClose={closeWindow(window.id)}
            onAccess = {accessHander(window.id)}
            style={{ zIndex: 100 + (windows.length - windows.indexOf(window)) }}
          />
        ))}
      </div>
    </>
  );
}

export default App;

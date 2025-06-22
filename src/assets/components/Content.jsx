import React from 'react'; 
import About from './Pages/About';
import Projects from './Pages/Projects';
import Posts from './Pages/Posts';
import Game from './Pages/Game';

// 1. Destructure `contentType` from the props object
function Content({ contentType = 'default' }) {
  const contentMap = {
    default: <div className="content"> This is the default content. </div>,
    about: <About />,
    projects: <Projects />,
    posts: <Posts />,
    game: <Game />,
  };

  // Look up the content, or fall back to default if contentType is invalid
  const content = contentMap[contentType] || contentMap.default;

  // 2. Return the JSX element directly
  return content;
}

export default Content;
import React from 'react';
import './css/Projects.css';
import Page1 from './pages/Page1.jsx';
import Page2 from './pages/Page2.jsx';
import Page3 from './pages/Page3.jsx';
import Page4 from './pages/Page4.jsx';

function Projects(){
    const pages = [
        <Page1 />,
        <Page2 />,
        <Page3 />,
    ]

    const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
    const totalPages = pages.length;
    const leftArrowClick = () => {setCurrentPageIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);};
    const rightArrowClick = () => {setCurrentPageIndex((prevIndex) => (prevIndex + 1) % totalPages);};
    const currentPage = pages[currentPageIndex];
    return (
        <div className="projects-main-container">
            <div className = "carousel-container">
                <div 
                    className = "left-arrow arrow"
                    onMouseDown = {leftArrowClick}
                >{"<"}</div>

                <div 
                    className = "right-arrow arrow"
                    onMouseDown = {rightArrowClick}
                >{">"}</div>

                <div className = "carousel"> {currentPage} </div>
            </div>
        </div>
    );
}

export default Projects;
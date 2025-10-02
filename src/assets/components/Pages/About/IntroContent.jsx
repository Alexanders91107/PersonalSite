import React, { useState } from 'react';
import './css/IntroContent.css'; // Assuming you have a CSS file for styling
import headshot from './images/headshot.jpg';
import resume from './resume.pdf';

function IntroContent(){
    return (
        <div className="intro-main-container">
            <div className = "subcontainer intro-subcontainer">
                <div className = "profile-image"><img src={headshot} alt="headshot" className="headshot-image"/></div>
                <div className = "profile-text">Alexander Spiliotopoulos</div>
            </div>
            <div className = "subcontainer intro-subcontainer">
                <div className = "subcontainer-text">18 year old <span className = "important-text">computer science student</span></div>
                <hr />
                <div className = "subcontainer-text">Based in <span className = "important-text">New York City</span></div>
            </div>
            <div className = "subcontainer intro-subcontainer">
                <div className = "skills-list">
                    <div className = "skills-item">Python</div>
                    <div className = "skills-item">SQL</div>
                    <div className = "skills-item">Java</div>
                    <div className = "skills-item">C++</div>
                    <div className = "skills-item">JavaScript</div>
                </div>
            </div>
            <div className = "subcontainer intro-subcontainer">
                <div className = "subcontainer-title">The ASPI</div>
                <div className = "subcontainer-text">January 2025 - June 2025</div>
                <hr />
                <div className = "subcontainer-text"> <div className = "important-text"> Software Engineering Intern </div> </div>
                <div className = "subcontainer-text">Worked to develop an end to end full-stack web application for internal use, utilizing React.js, Node.js, SQL, Azure, and more.</div>
            </div>
            <div className = "subcontainer intro-subcontainer">
                <div className = "subcontainer-title">Paterson STEAM High School</div>
                <div className = "subcontainer-text">October 2024 - December 2024</div>
                <hr />
                <div className = "subcontainer-text"> <div className = "important-text"> Computer Science Teachers Assistant Internship </div> </div>
                <div className = "subcontainer-text">Designed and delivered lessons in beginner and intermediate computer science. Provided one-on-one mentorship, clarifying programming concepts, and debugging code.</div>
            </div>
            <div className = "subcontainer intro-subcontainer">
                <div className = "subcontainer-title" id = "nj-congressional-office">NJ's 9th congressional district office</div>
                <div className = "subcontainer-text">January 2025 - June 2025</div>
                <hr />
                <div className = "subcontainer-text"> <div className = "important-text"> Software Engineer Intern </div> </div>
                <div className = "subcontainer-text">Worked to develop an end to end full-stack web application for internal use, utilizing React.js, Node.js, SQL, Azure, and more.</div>
            </div>
            <div className = "subcontainer intro-subcontainer">
                <div className = "skills-list">
                    <div className = "skills-item"><a href="https://github.com/Alexanders91107" target="_blank" rel="noopener noreferrer">GitHub</a></div>
                    <div className = "skills-item"><a href="https://www.linkedin.com/in/alexander-spiliotopoulos-488929227" target="_blank" rel="noopener noreferrer">LinkedIn</a></div>
                    <div className = "skills-item"><a href={resume} download="resume.pdf">Resume</a></div>
                </div>
            </div>
        </div>
    );
}

export default IntroContent;
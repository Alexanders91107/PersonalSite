import React, { useState } from 'react';
import './css/GeneralContent.css'; // Assuming you have a CSS file for styling
import headshot from './images/headshot.jpg';

function GeneralContent(){
    return (
        <div className="general-main-container">
            <div className = "subcontainer general-subcontainer">
                <div className = "subcontainer-title">Who are you?</div>
                <div className = "subcontainer-text">
                    I'm a 18-year-old <span className = "important-text">computer science student</span> with a background in early college and <span className = "important-text">real-world experience</span> in software development, database management, and front-end development and design. I have a passion for learning as much as I can about not only computer science, but also many other fields that interest me.
                </div>
            </div>
            <div className = "subcontainer general-subcontainer">
                <div className = "subcontainer-title">What drives you?</div>
                <div className = "subcontainer-text">
                    Learning about the world around me is one of the things I value most, second only to using that knowledge to <span className = "important-text">solve real problems</span>, whether for myself, my loved ones, my community, or the broader world. I strive not just to improve my skills, but to use them in ways that make a <span className = "important-text">meaningful impact</span>.
                </div>
            </div>
            <div className = "subcontainer general-subcontainer">
                <div className = "subcontainer-title">And your goals?</div>
                <div className = "subcontainer-text">
                    I’m currently working toward my computer science degree, with a growing interest in machine learning, neural networks, graph theory, and the design of data-intensive systems. I'm always looking for new ways to apply programming to real-world problems, and I’m especially drawn to projects that push my understanding. <span className = "important-text">If you're working on something interesting, I’d love to hear about it.</span>
                </div>
            </div>
        </div>
    );
}

export default GeneralContent;
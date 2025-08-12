import React, { useState } from 'react';
import GeneralContent from './GeneralContent';
import SkillsContent from './SkillsContent';
import OtherContent from './OtherContent';
import './css/About.css'; // Assuming you have a CSS file for styling

function About(){
    const [pageTitle, setPageTitle] = useState("General");

    const contentMap = {
        General: <GeneralContent />,
        Skills: <SkillsContent />,
        Other: <OtherContent />,
    };

    return (
        <div className="main-container">
            <div className = "header">
                <button className = "page-button" onClick={() => setPageTitle("General")}>General</button>
                <button className = "page-button" onClick={() => setPageTitle("Skills")}>Skills</button>
                <button className = "page-button" onClick={() => setPageTitle("Other")}>Other</button>
            </div>
            <div className = "content">
                {contentMap[pageTitle]}
            </div>
            <div className = "background"></div>
        </div>
    );
}

export default About;
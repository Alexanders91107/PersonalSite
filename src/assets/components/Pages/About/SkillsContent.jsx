import React from 'react';
import './css/SkillsContent.css';
import nodejsImage from './images/nodejs.png'; //
import reactjsImage from './images/reactjs.png'; //
import htmlImage from './images/html.png'; 
import cssImage from './images/css.png';
import sqlImage from './images/sql.png';
import javaImage from './images/java.png';
import pythonImage from './images/python.png';
import cppImage from './images/cpp.png';
import azureImage from './images/azure.png';

function SkillsContent(){
    const skillsData = [
        { name: 'Node.js', image: nodejsImage, color: 'rgba(119, 255, 149, 0.8)', align: 'left' },
        { name: 'React.js', image: reactjsImage, color: 'rgba(97, 218, 251, 0.8)', align: 'right' },
        { name: 'HTML', image: htmlImage, color: 'rgba(227, 79, 38, 0.8)', align: 'left' },
        { name: 'CSS', image: cssImage, color: 'rgba(21, 114, 182, 0.8)', align: 'right' },
        { name: 'SQL', image: sqlImage, color: 'rgba(119, 173, 255, 0.8)', align: 'left' },
        { name: 'Java', image: javaImage, color: 'rgba(255, 135, 119, 0.8)', align: 'right' },
        { name: 'Python', image: pythonImage, color: 'rgba(255, 252, 82, 0.8)', align: 'left' },
        { name: 'C++', image: cppImage, color: 'rgba(119, 139, 255, 0.8)', align: 'right' },
        { name: 'Azure', image: azureImage, color: 'rgba(0, 120, 212, 0.8)', align: 'left' },
    ];

    return (
        <div className="skills-main-container">
            {skillsData.map((skill) => {
                const isFromLeft = skill.align === 'left';
                const content = isFromLeft ? (
                    <>
                        <div className="subcontainer-title-skills subcontainer-title">{skill.name}</div>
                        <div className="image-container"><img src={skill.image} alt={skill.name} className="skill-image" /></div>
                    </>
                ) : (
                    <>
                        <div className="image-container"><img src={skill.image} alt={skill.name} className="skill-image" /></div>
                        <div className="subcontainer-title-skills subcontainer-title">{skill.name}</div>
                    </>
                );

                return (
                    <div
                        className={`skills-subcontainer subcontainer ${isFromLeft ? 'from-left' : 'from-right'}`}
                        style={{ '--skill-color': skill.color }}
                    >
                        {content}
                    </div>
                );
            })}
        </div>
    );
}

export default SkillsContent;
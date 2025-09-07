import React from 'react';
import './css/pages.css';
import aspiImage from './images/aspi.png';

function Page1(){
    return (
        <div className="page-main-container">
            <div 
                className = "page-container"
                style = {{background: 'linear-gradient(135deg,rgb(56, 56, 56),rgb(158, 158, 158))'}}
            >
                <div className = "page-column-1">
                    <div className = "page-title">ASPI Project</div>
                    <div className = "page-description">
                        This is a project that I did during my six-month internship at the ASPI. It involved using Azure, SQL, Node.js, Vite React, and CSS. For this project, I took all of the company's data, built and hosted a database, and then built out both the front and back end of a site, which allowed them to easily query and filter the data. I was the only person who worked on this project; all of it was done by me. Unfortunately, I cannot show any screenshots or share the code for this project, as it involves sensitive company data.
                    </div>
                </div>
                <div className = "page-column-2">
                    <div className = "page-image">
                        <div className = "page-image-container">
                            <img 
                                src = {aspiImage}
                                alt = "ASPI Project"
                                style = {{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                        </div>
                    </div>
                    <div className = "page-links">
                        <div className = "projects-page-link">
                            <div className = "projects-link-text"> No Link :c </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page1;
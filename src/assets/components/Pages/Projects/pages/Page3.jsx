import React from 'react';
import './css/pages.css';
import siteImage from './images/PersonalSite.png';
function Page3(){
    return (
        <div className="page-main-container">
            <div 
                className = "page-container"
                style = {{background: 'linear-gradient(135deg,rgb(43, 17, 43),rgb(92, 54, 92))'}}
            >
                <div className = "page-column-1">
                    <div className = "page-title">Personal Site</div>
                    <div className = "page-description">
                        This project is a personal site that contains information about who I am, and what I do. If you are reading this, then you are on this site currently. This site used React and CSS, and is also being self hosted on a server which I set up. This site was meant to both demonstrate a bit of my technical ability to build visually appealing websites, as well as reflect on my personality for anyone who is interested.
                    </div>
                </div>
                <div className = "page-column-2">
                    <div className = "page-image">
                        <div className = "page-image-container">
                            <img 
                                src = {siteImage}
                                alt = "Spotify Project"
                                style = {{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px'}}
                            />
                        </div>
                    </div>
                    <div className = "page-links">
                        <div className = "projects-page-link"> 
                            <div className = "projects-link-text"> Already Here! </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page3;
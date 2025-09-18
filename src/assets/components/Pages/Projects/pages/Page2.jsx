import React from 'react';
import './css/pages.css';
import spotifyImage from './images/spotify.png';

function Page2(){
    return (
        <div className="page-main-container">
            <div 
                className = "page-container"
                style = {{background: 'linear-gradient(135deg, #1e2e1e, #3c4c3c)'}}
            >
                <div className = "page-column-1">
                    <div className = "page-title">Spotify Viewer</div>
                    <div className = "page-description">
                        The Spotify Viewer is a site that I built, which allows you to log in with your Spotify account and view various statistics about your listening habits. This project utilized HTML, JavaScript, CSS, and the Spotify API. Unfortunately, due to limitations on the Spotify API, I can only have a certain number of approved users at once, so I cannot provide a direct link to the site, however, I'll put the link to a youtube video of me using the site. Additionally, I'll make a post about this site under the 'posts' section which you can go and read for more information.
                    </div>
                </div>
                <div className = "page-column-2">
                    <div className = "page-image">
                        <div className = "page-image-container">
                            <img 
                                src = {spotifyImage}
                                alt = "Spotify Project"
                                style = {{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px'}}
                            />
                        </div>
                    </div>
                    <div className = "page-links">
                        <div className = "projects-page-link">
                                <a  href = "https://youtu.be/s0hdVfoTEgs"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <div className = "projects-link-text"> See Video! </div>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page2;
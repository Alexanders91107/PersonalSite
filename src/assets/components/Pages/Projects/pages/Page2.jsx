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
                        The Spotify Viewer is a site that I built, which allows you to log in with your Spotify account and view various statistics about your listening habits. This project utilized HTML, JavaScript, CSS, and the Spotify API. Unfortunately, due to limitations on the Spotify API, I can only have a certain number of approved users at once. If you’d like to use the site, please log in with the following credentials: publicspotifyemail@gmail.com, password123.
                    </div>
                </div>
                <div className = "page-column-2">
                    <div className = "page-image">
                        <div className = "page-image-container">
                            <img 
                                src = {spotifyImage}
                                alt = "Spotify Project"
                                style = {{width: '100%', height: '100%', objectFit: 'cover'}}
                            />
                        </div>
                    </div>
                    <div className = "page-links">
                        <div className = "projects-page-link">
                                <a  href = "https://effulgent-narwhal-d486fb.netlify.app/main?code=AQBLNwiNPARUORoy0eAvYkBuZ6nmLfEwYm0kyLryzO-TPrAJU2piSB-R1oVV05JD9JXpchMDbkIRgZFxu8bG3PZyebiDI4udi3VULvjKTCJTbrZsMPzmu1p0DkB7gszLlRzGjXcVsB14JgcqYLATRpS1T3RJl7ZIheUpYKAeEfTl9MPSKRbues7GrKnhxMEQfQUbTvDt6BJPwj2w2sZgHOIBNbWPbGMkF6ogtAhER3HoVf0yl_vDVc1IZk7ESw9pHL5NLuRNBlEM6EfISi9QUwd1g_Rsc_TQ-2ta2CDen9SNIietOqjrRg3XE2uTFMHDJ0W9a5Pu4jflsTg"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <div className = "projects-link-text"> Go to site! </div>
                                </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page2;
import React from 'react';
import './css/generalPost.css';

function SpotifyViewerPost(){
    return (
        <div className="general-post-container"
            style = {{background: "linear-gradient(135deg, #228339ff 0%, #065321ff 100%)"}}
        >
            <div className = "general-post-title"> SPOTIFY VIEWER </div>
            <div className = "general-post-subtitle"> Date: 09/11/25 </div>
            <div className = "general-post-content">
                Hello, this post is about the Spotify Viewer project that I did a couple of months ago. This project was a mess; it was COMPLETELY changed from what it was initially supposed to be. I initially was planning on using a person's liked songs to create a network of songs, separate the songs into groups, and display other interesting information about their music taste. Anyways, I had the Spotify API and the network display set up, and then like HALF of the Spotify API was depreciated, and unfortunately, that included like literally everything I needed for the project. So, I still just scrapped the project and made a site where you can just view your recent listening trends for different time periods. 
                <br/><br/>
                <div className = "general-post-image-container">
                    <iframe className = "general-post-image"
                        src="https://www.youtube.com/embed/s0hdVfoTEgs">
                    </iframe>
                </div>
                Anyways, that's it. Bye!
                <br/><br/>
            </div>
        </div>
    );
}

export default SpotifyViewerPost;
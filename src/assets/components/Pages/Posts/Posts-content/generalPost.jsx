import React from 'react';
import './css/generalPost.css';

function GeneralPost(){
    return (
        <div className="general-post-container">
            <div className = "general-post-title"> INFORMATION </div>
            <div className = "general-post-subtitle"> Date: 09/10/25 </div>
            <div className = "general-post-content">
                Hello, this post is just general information about this page and how it will function. This page is basically just for me; I can put literally whatever I want on it. I feel like it will probably just be me talking about my different projects, but I’m sure I’ll use this to rant about different things from time to time.. 
                <br/><br/>
                Anyways, as you can see below: 
                <br/><br/><br/><br/>
                This page will not just be blobs of text; I’ll put pictures, videos, and other things. These pages are just their React files, so I can do anything with them. 
                <br/><br/>
                <div className = "general-post-image-container">
                </div>
                Anyways, that's it. Bye!
                <br/><br/>
            </div>
        </div>
    );
}

export default GeneralPost;
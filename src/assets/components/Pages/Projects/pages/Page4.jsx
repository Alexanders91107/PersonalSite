import React from 'react';
import './css/pages.css';

function Page4(){
    return (
        <div className="page-main-container">
            <div 
                className = "page-container"
                style = {{background: 'linear-gradient(135deg, #1e2e1e, #3c4c3c)'}}
            >
                <div className = "page-column-1">
                    <div className = "page-title">Page 4</div>
                    <div className = "page-description">
                        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
                <div className = "page-column-2">
                    <div className = "page-image">
                        <div className = "page-image-container"></div>
                    </div>
                    <div className = "page-links">
                        <div className = "page-link">Link 1</div>
                        <div className = "page-link">Link 2</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page4;
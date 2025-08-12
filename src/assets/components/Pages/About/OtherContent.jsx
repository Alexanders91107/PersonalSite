import { useState, useEffect, useRef } from 'react';
import './css/OtherContent.css';

const NUM_IMAGES = 20;
const GAP = 20; // Gap between images
const IMG_WIDTH = 150;

function OtherContent(){
    const [hasEntered, setHasEntered] = useState(false);
    const [imageStreamHeight, setImageStreamHeight] = useState(0); // Height of each image in the stream
    const imageStreamRef = useRef(null);

    const deltaX = useRef(0);
    const loop = useRef(-2);

    const [imgPositions, setImgPositions] = useState([]);

    useEffect(() => {
        const streamElement = imageStreamRef.current;
        if(!streamElement) return;

        const observer = new ResizeObserver(entries => {
            if(entries[0]){
                setImageStreamWidth(entries[0].contentRect.width);
                setImageStreamHeight(entries[0].contentRect.height);
            }
        });

        observer.observe(streamElement);
        return () => observer.disconnect();
    }, []);

    //initializes the image positions based on the stream height and gap
    useEffect(() => {
        const initialPositions = Array.from({ length: NUM_IMAGES }, (_, i) => 
            (i) * (IMG_WIDTH + GAP)
        );
        setImgPositions(initialPositions);
    }, []);


    //updates with a new date every second
    useEffect(() => {
        // Set up an interval to update the time every second
        const timerId = setInterval(() => {
            deltaX.current += 1;

            if(deltaX.current >= IMG_WIDTH + GAP){
                deltaX.current = 0;
                loop.current++;
            }

            if(loop.current >= NUM_IMAGES) loop.current = 0;

            setImgPositions(prevPositions => {
                return prevPositions.map((_, index) => {
                    return (((index + loop.current) % NUM_IMAGES) - 1) * (IMG_WIDTH + GAP) + deltaX.current;
                });
            });
        }, 16);

        return () => clearInterval(timerId); //removes interval when component is removed
    }, []); // The empty array ensures this effect runs only once on initial render

    //function to handle the click event for entering the page
    const handleEnterClick = () =>{
        setHasEntered(true);
    }

    const imgStyle = imgPositions.map((pos, index) => ({
        transform: `translateX(${pos}px)`, // Use transform for performance
        backgroundColor: `hsl(${(index * 15) % 360}, 70%, 50%)`, // Example color change
    }));

    return (
        <div className="other-main-container">
            {/* Use a ternary operator for conditional rendering. */}
            {hasEntered ? (
                // If hasEntered is true, show the main content.
                <div className = "other-content">
                    <div className = "other-header"> 
                        <div className = "other-header-text">About Me :D</div>
                    </div>
                    <div className = "other-subcontainer-row" id = "other-subcontainer-row-1">
                        <div className = "other-subcontainer" id = "other-subcontainer-1">
                            <div className = "other-subcontainer-title"> Title </div>
                            <div className = "other-subcontainer-content">
                                <div className = "other-subcontainer-img"></div>
                                <div className = "other-subcontainer-text">
                                    This is some text that will be displayed in the first subcontainer. 
                                    It can be used to provide additional information or context.
                                </div>
                            </div>
                        </div>
                        <div className = "other-subcontainer" id = "other-subcontainer-2">
                            <div className = "other-subcontainer-title"> Title </div>
                            <div className = "other-subcontainer-content">
                                <div className = "other-subcontainer-img"></div>
                                <div className = "other-subcontainer-text">
                                    This is some text that will be displayed in the first subcontainer. 
                                    It can be used to provide additional information or context.
                                </div>
                            </div>
                        </div>
                        <div className = "other-subcontainer" id = "other-subcontainer-3">
                            <div className = "other-subcontainer-img head-img"></div>
                        </div>
                    </div>
                    <div className = "other-subcontainer-row" id = "other-subcontainer-row-2">
                        <div className = "other-subcontainer" id = "other-subcontainer-4">
                            <div className = "other-subcontainer-title title-big"> Title </div>
                            <div ref = {imageStreamRef} key = "image-stream" className = "other-image-stream">
                                {
                                    imgStyle.map((currStyle, index) => (
                                        <div 
                                            key={index}
                                            className="other-image-stream-img"
                                            style={currStyle}
                                        ></div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className = "other-subcontainer-row" id = "other-subcontainer-row-3">
                        <div className = "other-subcontainer" id = "other-subcontainer-5">
                            <div className = "other-subcontainer-img head-img"></div>
                        </div>
                        <div className = "other-subcontainer" id = "other-subcontainer-6">
                            <div className = "other-subcontainer-title"> Title </div>
                            <div className = "other-subcontainer-content">
                                <div className = "other-subcontainer-img"></div>
                                <div className = "other-subcontainer-text">
                                    This is some text that will be displayed in the first subcontainer. 
                                    It can be used to provide additional information or context.
                                </div>
                            </div>
                        </div>
                        <div className = "other-subcontainer" id = "other-subcontainer-7">
                            <div className = "other-subcontainer-title"> Title </div>
                            <div className = "other-subcontainer-content">
                                <div className = "other-subcontainer-img"></div>
                                <div className = "other-subcontainer-text">
                                    This is some text that will be displayed in the first subcontainer. 
                                    It can be used to provide additional information or context.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // If hasEntered is false, show the warning.
                <div className = "warning-page">
                    <div className = "warning-title"> WARNING </div>
                    <div className = "warning-text">
                        This page is unprofessional!! <br />
                        Enter at your own risk! <br />
                    </div>
                    <button className = "warning-button" onClick={handleEnterClick}>
                        enter..
                    </button>
                </div>
            )}
        </div>
    );
}

export default OtherContent;
import { useState, useEffect, useRef } from 'react';
import './css/OtherContent.css';
import bookImage from './images/book.png';
import pencilImage from './images/pencil.png';
import bassImage from './images/bass.png'; 
import editImage from './images/edit.png';
import headOnImage from './images/FaceOpen.png'; 
import headOffImage from './images/FaceFlat.png'; 
import MeditationsImage from './images/Meditations.png';
import CasiopeaImage from './images/Casiopea.png';
import InTheBuddhasWordsImage from './images/InTheBuddhasWords.png';
import EpictetusImage from './images/Epictetus.png';
import TaoTeChingImage from './images/TaoTeChing.png';
import MinecraftImage from './images/Minecraft.png';
import BalatroImage from './images/Balatro.png';
import UndertaleImage from './images/Undertale.png';
import DaftPunkImage from './images/DaftPunk.png';
import GorillazImage from './images/Gorillaz.png';
import AttackOnTitanImage from './images/AttackOnTitan.png';
import MushokuTenseiImage from './images/MushokuTensei.png';
import DanDaDanImage from './images/DanDaDan.png';
import ChainsawManImage from './images/ChainsawMan.png';
import JojoImage from './images/Jojo.png';
import GeometryDashImage from './images/GeometryDash.png';
import DeltaruneImage from './images/Deltarune.png';



const NUM_IMAGES = 17;
const GAP = 20; // Gap between images
const IMG_WIDTH = 150;

function OtherContent({ setOverlayActive }) {
    const [hasEntered, setHasEntered] = useState(false);
    const [imageStreamHeight, setImageStreamHeight] = useState(0); // Height of each image in the stream
    const imageStreamRef = useRef(null);

    const deltaX = useRef(0);
    const loop = useRef(-2);

    const [imgPositions, setImgPositions] = useState([]);

    const [imgLinks, setImgLinks] = useState([
        MeditationsImage,
        CasiopeaImage,
        InTheBuddhasWordsImage,
        EpictetusImage,
        TaoTeChingImage,
        MinecraftImage,
        BalatroImage,
        UndertaleImage,
        DaftPunkImage,
        GorillazImage,
        AttackOnTitanImage,
        MushokuTenseiImage,
        DanDaDanImage,
        ChainsawManImage,
        JojoImage,
        GeometryDashImage,
        DeltaruneImage]);
    
    const [headImage1, setHeadImage1] = useState(headOffImage);
    const [headImage2, setHeadImage2] = useState(headOffImage);

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

    useEffect(() => {
        // If the user has entered, activate the overlay
        if (hasEntered) setOverlayActive(true);

        // The cleanup function runs when the component unmounts (e.g., user clicks "General")
        return () => {
            // Deactivate the overlay when leaving this page
            setOverlayActive(false);
        };
    }, [hasEntered, setOverlayActive]); // Rerun this effect if hasEntered changes


    const imgStyle = imgPositions.map((pos, index) => ({
        transform: `translateX(${pos}px)`, // Use transform for performance
        backgroundColor: `#00000000`, // Example color change
    }));

    const Head1TouchStart = (e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        setHeadImage1(headOnImage);
    }

    const Head2TouchStart = (e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        setHeadImage2(headOnImage);
    }

    const Head1TouchEnd = (e) => {
        e.currentTarget.style.transform = "scale(1)";
        setHeadImage1(headOffImage);
    }

    const Head2TouchEnd = (e) => {
        e.currentTarget.style.transform = "scale(1)";
        setHeadImage2(headOffImage);
    }


    return (
        <div className="other-main-container">
            {hasEntered ? (
                // If hasEntered is true, show the main content.
                <div className = "other-content">
                    <div className = "other-header"> 
                        <div className = "other-header-text">About Me :D</div>
                    </div>
                    <div className = "other-subcontainer-row" id = "other-subcontainer-row-1">
                        <div className = "other-subcontainer" id = "other-subcontainer-1">
                            <div className = "other-subcontainer-title"> Bass </div>
                            <div className = "other-subcontainer-content">
                                <div className = "other-subcontainer-img-container" id = "bass-img-container">
                                    <img src = {bassImage} alt = "bass" className = "other-subcontainer-img"/>
                                </div>
                                <div className = "other-subcontainer-text">
                                    This is one of my biggest hobbies! I play bass every day, 
                                    I’ve been playing since September 2024. Bass is probably my favorite instrument.
                                </div>
                            </div>
                        </div>
                        <div className = "other-subcontainer" id = "other-subcontainer-2">
                            <div className = "other-subcontainer-title"> Drawing </div>
                            <div className = "other-subcontainer-content">
                                <div className = "other-subcontainer-img-container">
                                    <img src = {pencilImage} alt = "pencil" className = "other-subcontainer-img"/>
                                </div>
                                <div className = "other-subcontainer-text">
                                    This is another one of my biggest hobbies! I draw everyday.
                                    I've also recently been learning how to do 2d animation with plans on getting into 3d as well.
                                </div>
                            </div>
                        </div>
                        <div className = "other-subcontainer" id = "other-subcontainer-3">
                            <div 
                                className = "other-subcontainer-img-container head-img"
                                onMouseEnter = {Head1TouchStart}
                                onMouseLeave = {Head1TouchEnd}
                                onTouchStart = {Head1TouchStart}
                                onTouchEnd = {Head1TouchEnd}
                            >
                                <img src = {headImage1} alt = "head" className = "other-subcontainer-img"/>
                            </div>
                        </div>
                    </div>
                    <div className = "other-subcontainer-row" id = "other-subcontainer-row-2">
                        <div className = "other-subcontainer" id = "other-subcontainer-4">
                            <div className = "other-subcontainer-title title-big"> Media I Like! </div>
                            <div ref = {imageStreamRef} key = "image-stream" className = "other-image-stream">
                                {
                                    imgStyle.map((currStyle, index) => (
                                        <div 
                                            key={index}
                                            className="other-image-stream-img"
                                            style={currStyle}
                                        >
                                            <img 
                                                src={imgLinks[index]} 
                                                alt={`img-${index}`} 
                                                className="other-subcontainer-img"
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className = "other-subcontainer-row" id = "other-subcontainer-row-3">
                        <div className = "other-subcontainer" id = "other-subcontainer-5">
                            <div 
                                className = "other-subcontainer-img-container head-img"
                                onMouseEnter = {Head2TouchStart}
                                onMouseLeave = {Head2TouchEnd}
                                onTouchStart = {Head2TouchStart}
                                onTouchEnd = {Head2TouchEnd}
                            >
                                <img src = {headImage2} alt = "head" className = "other-subcontainer-img"/>
                            </div>
                        </div>
                        <div className = "other-subcontainer" id = "other-subcontainer-6">
                            <div className = "other-subcontainer-title"> Reading </div>
                            <div className = "other-subcontainer-content">
                                <div className = "other-subcontainer-img-container">
                                    <img src = {bookImage} alt = "book" className = "other-subcontainer-img"/>
                                </div>
                                <div className = "other-subcontainer-text">
                                    Other than manga, I pretty much like only read philosophy. 
                                    You can see some of my fav books in the media I like section.
                                </div>
                            </div>
                        </div>
                        <div className = "other-subcontainer" id = "other-subcontainer-7">
                            <div className = "other-subcontainer-title"> Editing </div>
                            <div className = "other-subcontainer-content">
                                <div className = "other-subcontainer-img-container">
                                    <img src = {editImage} alt = "edit" className = "other-subcontainer-img"/>
                                </div>
                                <div className = "other-subcontainer-text">
                                    This pretains to video and photo editing!
                                    This is something I really enjoy doing, you can see some of my work on my socials.
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
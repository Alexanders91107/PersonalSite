import React, { useState , useRef, useEffect } from 'react';
import './css/game.css';

function Game(){
    const yMin = 40;

    const [gameStarted, setGameStarted] = useState(false);
    const [paddlePosition, setPaddlePosition] = useState(yMin);
    const [ballPosition, setBallPosition] = useState({x: 500, y: 500});
    const [ballDirection, setBallDirection] = useState({x: 1, y: -2});
    const gameContainerRef = useRef(null);
    const paddleRef = useRef(null);
    const ballRef = useRef(null);

    function startGame(){
        setGameStarted(true);
    }

    useEffect(() => {
        // Only add event listeners when the game has started
        if (!gameStarted) return;
        let windowBottom = gameContainerRef.current.clientHeight + 20;
        let windowRight = gameContainerRef.current.clientWidth - 20;
        let dx = 2;
        let dy = -2;

        const handleKeyDown = (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    event.preventDefault(); // Prevent page scrolling
                    setPaddlePosition(prev => Math.max(yMin, prev - 10)); // Move paddle up
                    break;
                case 'ArrowDown':
                    event.preventDefault(); // Prevent page scrolling
                    setPaddlePosition(prev => Math.min(windowBottom - 50, prev + 10)); // Move paddle down (you may want to add a max limit)
                    break;
                default:
                    break;
            }
        };

        const gameLoop = setInterval(() => {
            windowBottom = gameContainerRef.current.clientHeight + 20;
            windowRight = gameContainerRef.current.clientWidth - 20;
            let pastTop = false;
            let pastBottom = false;
            let pastRight = false;

            setBallPosition(prev => {
                let newX = prev.x + dx;
                let newY = prev.y + dy;

                // Check for collisions with walls
                if (newY < yMin) {
                    newY = yMin + 1;
                    dy = -1 * dy;
                }
                if (newY >= windowBottom) {
                    newY = windowBottom - 1;
                    dy = -1 * dy;
                }
                if (newX >= windowRight) {
                    newX = windowRight - 1;
                    dx = -1 * dx;
                }

                return { x: newX, y: newY };
            });
        }, 1000 / 60); // 60 FPS

        // Add event listener to the window
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove event listener when component unmounts or game stops
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameStarted]);


    let startButtonStyle = {display: gameStarted ? 'none' : ''};
    let gameContainerStyle = {display: gameStarted ? '' : 'none'};
    let paddleStyle = {top: `${paddlePosition}px`};
    let ballStyle = {left: `${ballPosition.x}px`, top: `${ballPosition.y}px`};

    return (
        <div className="game-main-container">
            <div className="start-button"
                onClick={startGame}
                style={startButtonStyle}
            >
                Start
            </div>
            <div className="game-container" ref={gameContainerRef} style={gameContainerStyle}>
                <div className = "paddle" ref={paddleRef} style={paddleStyle}>|</div>
                <div className = "ball" ref={ballRef} style={ballStyle}>O</div>
            </div>
        </div>
    );
}

export default Game;
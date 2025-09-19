import React, { useState , useRef, useEffect } from 'react';
import './css/game.css';

function Game(){
    const yMin = 40;

    const [gameStarted, setGameStarted] = useState(false);
    const [paddlePosition, setPaddlePosition] = useState(yMin);
    const [ballPosition, setBallPosition] = useState({x: 500, y: 500});
    const gameContainerRef = useRef(null);
    const paddleRef = useRef(null);
    const ballRef = useRef(null);
    const [paddleSpeed, setPaddleSpeed] = useState(10);
    const [gameScore, setGameScore] = useState(0);

    const currentPaddlePosition = useRef(yMin);
    const pointEarned = useRef(false);

    function startGame(){
        setGameStarted(true);
        pointEarned.current = false;
    }

    useEffect(() => {
        currentPaddlePosition.current = paddlePosition;
    }, [paddlePosition]);

    useEffect(() => {
        // Only add event listeners when the game has started
        if (!gameStarted) return;
        let windowBottom = gameContainerRef.current.clientHeight + 20;
        let windowRight = gameContainerRef.current.clientWidth - 20;
        let dx = 2;
        let dy = -2;
        setBallPosition({x: 500, y: 500});
        pointEarned.current = false;

        const handleKeyDown = (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    event.preventDefault(); // Prevent page scrolling
                    setPaddlePosition(prev => Math.min(windowBottom - 30, Math.max(yMin, prev - paddleSpeed))); // Move paddle up
                    break;
                case 'ArrowDown':
                    event.preventDefault(); // Prevent page scrolling
                    setPaddlePosition(prev => Math.min(windowBottom - 30, prev + paddleSpeed)); // Move paddle down (you may want to add a max limit)
                    break;
                default:
                    break;
            }
        };

        const gameLoop = setInterval(() => {
            windowBottom = gameContainerRef.current.clientHeight + 20;
            windowRight = gameContainerRef.current.clientWidth - 20;
            const paddleTop = currentPaddlePosition.current;
            const paddleBottom = currentPaddlePosition.current + 86;

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
                if (newX < 0) {
                    // Ball missed the paddle, reset position
                    newX = 500;
                    newY = 500;
                    dx = 2;
                    dy = -2;
                    setPaddleSpeed(10); // Reset paddle speed
                    setPaddlePosition(yMin); // Reset paddle position
                    setGameStarted(false); // Stop the game
                    setGameScore(0); // Reset score
                    pointEarned.current = false;
                    clearInterval(gameLoop); // Stop the game loop
                }
                // Check for collision with paddle
                if (newX <= 30) {
                    if (newY >= paddleTop && newY <= paddleBottom) {
                        dx = -1 * dx;
                        newX = 35; // Prevent the ball from going past the paddle
                        
                        if(!pointEarned.current){
                            if(dx < 0) dx -= 0.2;
                            else dx += 0.2;
                            if(dy < 0) dy -= 0.2;
                            else dy += 0.2;

                            setGameScore(prev => prev + 1); // Increase score
                            setPaddleSpeed(prev => prev + 1); // Increase paddle speed slightly
                            pointEarned.current = true;
                        }
                    }
                }
                if (newX > 60 && pointEarned.current) pointEarned.current = false;

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
                <div className = "score">{gameScore}</div>
            </div>
        </div>
    );
}

export default Game;